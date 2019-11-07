import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators, FormControlName } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Icon } from '../../models/image.model';
import { RandomGenerator } from '../../shared/random-generator';
import { Lesson, Status } from '../../models/lesson.model';
import { LessonsService } from '../../services/lessons.service';

@Component({
  selector: 'app-lesson-edit',
  templateUrl: './lesson-edit.component.html',
  styleUrls: ['./lesson-edit.component.scss']
})
export class LessonEditComponent implements OnInit, OnDestroy {

  pageTitle = 'Edición de Curso';
  errorMessage: string;
  lessonForm: FormGroup;

  lesson: Lesson;
  STATUS_ARRAY: Status[] = Lesson.getAllStatus();
  ICONS: Icon[] = Icon.getIcons();

  private sub: Subscription;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private lessonService: LessonsService) { }

  ngOnInit() {
    this.lessonForm = this.fb.group({
      courseId: ['', Validators.required],
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
      this.pageTitle = 'Creando una nueva clase';
    } else {
      this.pageTitle = `Editando la clase del día: ${this.lesson.date}`;
    }

    // Update the data on the form
    this.lessonForm.patchValue({
      courseId: this.lesson.courseId,
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

  /* TODO
  onRandomPopulateForm(): void {
    this.lesson.current = true;
    this.lesson.name = RandomGenerator.randomDisplayName();
    this.lesson.image = Icon.getRandom().path;
    this.lesson.startDate = new Date().toString();
    this.lesson.startTime = '00:00';
    this.lesson.endDate = new Date().toString();
    this.lesson.endTime = '00:00';
    this.lesson.teacher = 'Lourdes Menor';

    this.displayLesson();
  }
  */

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
    this.router.navigate([`/${Lesson.PATH_URL}`]);
  }

  gotoList(): void {
    // Reset the form to clear the flags
    this.lessonForm.reset();
    this.router.navigate([`/${Lesson.PATH_URL}`]);
  }
}
