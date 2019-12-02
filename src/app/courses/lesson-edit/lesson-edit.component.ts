import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators, FormControlName } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Icon } from '../../models/image.model';
import { Lesson, Status } from '../../models/lesson.model';
import { CoursesService } from '../../services/courses.service';
import { LessonsService } from '../../services/lessons.service';
import { Course } from '../../models/course.model';
import { UserDetails } from '../../models/user.model';
import { UserService } from '../../services/user.service';
import { DatePipe } from '@angular/common';
import { DatesService } from '../../services/dates.service';
import { AttendancesService } from '../../services/attendances.service';

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

  STATUS_ARRAY: Status[] = Lesson.getAllStatus();
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
          status: ['', Validators.required],
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

    if (this.lessonForm) {
      this.lessonForm.reset();
    }

    if (this.lesson.id === '0') {
      this.pageTitle = `Creando una nueva clase`;
    } else {
      this.pageTitle = `Editando una clase existente`;
    }


    // Update the data on the form
    this.lessonForm.patchValue({
      courseId: this.lesson.courseId,
      status: this.lesson.status,
      teacherId: this.lesson.teacherId,
      material: this.lesson.material,
      date: this.datesService.fromFirebaseDate(this.lesson.date),
      startTime: this.lesson.startTime,
      endTime: this.lesson.endTime
    });

    this.lessonForm.controls[Lesson.FIELD_TEACHER_ID].setValue(this.lesson.teacherId);
  }

  deleteLesson(): void {
    if (this.lesson.id === '0') {
      // Don't delete, it was never saved.
      this.onSaveComplete();
    } else {
      if (confirm(`Realmente quieres eliminar la clase del día: ${this.lesson.date}?`)) {
        this.lessonService.deleteLesson(this.course, this.lesson.id)
          .subscribe({
            next: () => this.onSaveComplete(),
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
        // this.datesService.toFirebaseDate(this.lesson.date);

        const item = { ...this.lesson, ...this.lessonForm.value };

        if (item.id === '0') {
          this.lessonService.createLesson(this.course, item)
            .subscribe({
              next: (lesson: Lesson) => {

                // 1. Creamos las attendances
                const attendancesIds = this.attendacesSvc.createAttendancesFromStudentList(this.course, lesson.id);

                // 2. Las asignamos a la lección
                // this.lesson.attendancesIds = attendancesIds; // TODO: Es necesario?

                // 3. Damos por cerrado el formulario
                this.onSaveComplete();
              },
              error: err => this.errorMessage = err
            });
        } else {
          this.lessonService.updateLesson(this.course, item)
            .subscribe({
              next: () => this.onSaveComplete(),
              error: err => this.errorMessage = err
            });
        }
    } else {
      this.errorMessage = 'Por favor, corrige los mensajes de validación.';
    }
  }

  onSaveComplete(): void {
    // Reset the form to clear the flags
    this.lessonForm.reset();
    this.router.navigate([`/${Course.PATH_URL}/${this.course.id}/`]);
  }

  gotoList(): void {
    // Reset the form to clear the flags
    this.lessonForm.reset();
    this.router.navigate([`/${Course.PATH_URL}/${this.course.id}/`]);
  }
}
