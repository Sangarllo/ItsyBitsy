import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators, FormControlName } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Icon } from '../../models/image.model';
import { RandomGenerator } from '../../shared/random-generator';
import { Lesson, Status } from '../../models/lesson.model';
import { CoursesService } from '../../services/courses.service';
import { LessonsService } from '../../services/lessons.service';
import { Course } from '../../models/course.model';

@Component({
  selector: 'app-lesson-edit',
  templateUrl: './lesson-edit.component.html',
  styleUrls: ['./lesson-edit.component.scss']
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

  private sub: Subscription;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private lessonService: LessonsService,
    private coursesService: CoursesService
    ) { }

  ngOnInit() {

    this.courseId = this.route.snapshot.paramMap.get('courseId');
    this.coursesService.getCourse(this.courseId)
    .subscribe({
      next: (course) => {

        this.course = course;
        this.courseTitle = `Curso ${this.course.name}`;

        this.lessonForm = this.fb.group({
          courseId: [course.id, Validators.required],
          name: [course.name, Validators.required],
          status: ['', Validators.required],
          teacher: ['', Validators.required],
          material: ['', Validators.required],
          date: ['', Validators.required],
          startTime: ['', Validators.required],
          endTime: ['', Validators.required],
        });

        // Read the student Id from the route parameter
        this.sub = this.route.paramMap.subscribe(
          params => {
            const id = params.get('id');
            this.getLesson(id);
          }
        );

      },
      error: err => this.errorMessage = err
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  getLesson(id: string): void {
    this.lessonService.getLesson(id)
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
      this.pageTitle = `Editando la clase del día: ${this.lesson.date}`;
    }

    // Update the data on the form
    this.lessonForm.patchValue({
      courseId: this.lesson.courseId,
      name: this.lesson.name,
      status: this.lesson.status,
      teacher: this.lesson.teacher,
      material: this.lesson.material,
      date: this.lesson.date,
      startTime: this.lesson.startTime,
      endTime: this.lesson.endTime
    });
  }

  deleteLesson(): void {
    if (this.lesson.id === '0') {
      // Don't delete, it was never saved.
      this.onSaveComplete();
    } else {
      if (confirm(`Realmente quieres eliminar la clase del día: ${this.lesson.date}?`)) {
        this.lessonService.deleteLesson(this.lesson.id)
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

        const item = { ...this.lesson, ...this.lessonForm.value };

        if (item.id === '0') {
          this.lessonService.createLesson(item)
            .subscribe({
              next: () => this.onSaveComplete(),
              error: err => this.errorMessage = err
            });
        } else {
          this.lessonService.updateLesson(item)
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
    this.router.navigate([`/${Course.PATH_URL}/${this.course.id}/${Lesson.PATH_URL}`]);
  }

  gotoList(): void {
    // Reset the form to clear the flags
    this.lessonForm.reset();
    this.router.navigate([`/${Lesson.PATH_URL}`]);
  }
}
