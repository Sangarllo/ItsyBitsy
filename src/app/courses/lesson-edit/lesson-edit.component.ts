import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators, FormControlName } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Icon } from '@models/image.model';
import { Lesson } from '@models/lesson.model';
import { CoursesService } from '@services/courses.service';
import { LessonsService } from '@services/lessons.service';
import { Course } from '@models/course.model';
import { UserDetails } from '@models/user.model';
import { UserService } from '@services/user.service';
import { DatePipe } from '@angular/common';
import { DatesService } from '@services/dates.service';
import { AttendancesService } from '@services/attendances.service';

@Component({
  selector: 'app-lesson-edit',
  templateUrl: './lesson-edit.component.html',
  styleUrls: ['./lesson-edit.component.scss'],
  providers: [ DatePipe ]
})
export class LessonEditComponent implements OnInit, OnDestroy {

  courseTitle = 'Edición de Curso';
  pageTitle = 'Edición de Curso';
  errorMessage: string;
  lessonForm: FormGroup;

  courseId: string;
  course: Course;
  lesson: Lesson;

  ICONS: Icon[] = Icon.getIcons();
  TEACHERS: UserDetails[];

  private sub: Subscription;

  constructor(
    public datepipe: DatePipe,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private attendacesSvc: AttendancesService,
    private datesService: DatesService,
    private lessonService: LessonsService,
    private coursesService: CoursesService
    ) {
    }

  ngOnInit() {

    this.courseId = this.route.snapshot.paramMap.get('courseId');
    this.coursesService.getCourse(this.courseId)
    .subscribe({
      next: (course) => {

        this.course = course;
        this.courseTitle = `Curso ${this.course.name}`;

        this.lessonForm = this.fb.group({
          courseId: [course.id, Validators.required],
          teacherId: [course.teacherId, Validators.required],
          material: '',
          date: ['', Validators.required], // TODO Calcular!
          startTime: [course.startTime, Validators.required],
          endTime: [course.endTime, Validators.required],
        });

        // Read the student Id from the route parameter
        this.sub = this.route.paramMap.subscribe(
          params => {
            const id = params.get('lessonId');
            this.getLesson(id);
          }
        );

        this.userService.getAllTeachers()
        .subscribe((teachers: UserDetails[]) => {
          this.TEACHERS = teachers;
        });

      },
      error: err => this.errorMessage = err
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  getLesson(id: string): void {
    this.lessonService.getLesson(this.course, id)
      .subscribe({
        next: (lesson: Lesson) => {
          this.lesson = lesson;
          this.displayLesson();
        },
        error: err => this.errorMessage = err
      });
  }

  displayLesson(): void {

    let lessonDate: Date;

    if (this.lessonForm) {
      this.lessonForm.reset();
    }

    if (this.lesson.id === '0') {
      this.pageTitle = `Creando una nueva clase`;
      lessonDate = this.lesson.date;
    } else {
      this.pageTitle = `Editando una clase existente`;
      lessonDate = this.datesService.fromFirebaseDate(this.lesson.date);
    }


    // Update the data on the form
    this.lessonForm.patchValue({
      courseId: this.lesson.courseId,
      teacherId: this.lesson.teacherId,
      material: this.lesson.material,
      date: lessonDate,
      startTime: this.lesson.startTime,
      endTime: this.lesson.endTime
    });

    this.lessonForm.controls[Lesson.FIELD_TEACHER_ID].setValue(this.lesson.teacherId);
  }

  deleteLesson(): void {
    if (this.lesson.id === '0') {
      // Don't delete, it was never saved.
      this.gotoCourse();
    } else {
      if (confirm(`Realmente quieres eliminar la clase del día: ${this.lesson.date}?`)) {
        this.lessonService.deleteLesson(this.course, this.lesson.id)
          .subscribe({
            next: () => this.gotoCourse(),
            error: err => this.errorMessage = err
          });
      }
    }
  }

  onResetForm(): void {
    this.lessonForm.reset();
  }

  onSaveForm(): void {
    if (this.lessonForm.valid) {

        this.lesson.date = new Date(2019, 11, 19);

        const item = { ...this.lesson, ...this.lessonForm.value };

        if (item.id === '0') {
          this.lessonService.createLesson(this.course, item)
            .subscribe({
              next: (createdLesson: Lesson) => {

                // 1. Creamos las attendances
                const attendancesIds = this.attendacesSvc.createAttendancesFromStudentList(
                  this.course,
                  createdLesson
                );

                // 2. Las asignamos a la lección
                /*
                  TODO:
                    De momento la relación es attendnance -> lesson
                    pero no lesson -> attendance*

                  this.lesson.attendancesIds = attendancesIds;
                */

                // 3. Damos por cerrado el formulario
                this.gotoCourse();
              },
              error: err => this.errorMessage = err
            });
        } else {
          this.lessonService.updateLesson(this.course, item)
            .subscribe({
              next: () => this.gotoCourse(),
              error: err => this.errorMessage = err
            });
        }
    } else {
      this.errorMessage = 'Por favor, corrige los mensajes de validación.';
    }
  }

  gotoCourse(): void {
    // Reset the form to clear the flags
    this.lessonForm.reset();
    this.router.navigate([`/${Course.PATH_URL}/${this.course.id}/`]);
  }
}
