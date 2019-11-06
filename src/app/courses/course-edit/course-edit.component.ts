import { Component, OnInit, OnDestroy } from '@angular/core';
import { Course } from 'src/app/models/course.model';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators, FormControlName } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CoursesService } from '../../services/courses.service';
import { Subscription } from 'rxjs';
import { Icon } from '../../models/image.model';
import { RandomGenerator } from '../../shared/random-generator';

@Component({
  selector: 'app-course-edit',
  templateUrl: './course-edit.component.html',
  styleUrls: ['./course-edit.component.scss']
})
export class CourseEditComponent implements OnInit, OnDestroy {

  pageTitle = 'Edición de Curso';
  errorMessage: string;
  courseForm: FormGroup;

  course: Course;
  ICONS: Icon[] = Icon.getIcons();

  private sub: Subscription;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private courseService: CoursesService) { }

  ngOnInit() {
    this.courseForm = this.fb.group({
      current: true,
      name: ['', [Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50)]],
      image: ['', Validators.required],
      startDate: ['', Validators.required],
      startTime: ['', Validators.required],
      endDate: ['', Validators.required],
      endTime: ['', Validators.required],
      teacher: ['', Validators.required],
    });

    // Read the student Id from the route parameter
    this.sub = this.route.paramMap.subscribe(
      params => {
        const id = params.get('id');
        this.getCourse(id);
      }
    );
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  getCourse(id: string): void {
    this.courseService.getCourse(id)
      .subscribe({
        next: (course: Course) => {
          this.course = course;
          this.displayCourse();
        },
        error: err => this.errorMessage = err
      });
  }

  displayCourse(): void {

    if (this.courseForm) {
      this.courseForm.reset();
    }

    if (this.course.id === '0') {
      this.pageTitle = 'Creando un nuevo curso';
    } else {
      this.pageTitle = `Editando el curso: ${this.course.name}`;
    }

    // Update the data on the form
    this.courseForm.patchValue({
      current: this.course.current,
      name: this.course.name,
      image: this.course.image,
      startDate: this.course.startDate,
      startTime: this.course.startTime,
      endDate: this.course.endDate,
      endTime: this.course.endTime,
      teacher: this.course.teacher
    });
  }

  deleteCourse(): void {
    if (this.course.id === '0') {
      // Don't delete, it was never saved.
      this.onSaveComplete();
    } else {
      if (confirm(`Realmente quieres eliminar: ${this.course.name}?`)) {
        this.courseService.deleteCourse(this.course.id)
          .subscribe({
            next: () => this.onSaveComplete(),
            error: err => this.errorMessage = err
          });
      }
    }
  }

  onRandomPopulateForm(): void {
    this.course.current = true;
    this.course.name = RandomGenerator.randomDisplayName();
    this.course.image = Icon.getRandom().path;
    this.course.startDate = new Date().toString();
    this.course.startTime = '00:00';
    this.course.endDate = new Date().toString();
    this.course.endTime = '00:00';
    this.course.teacher = 'Lourdes Menor';

    this.displayCourse();
  }

  onResetForm(): void {
    this.courseForm.reset();
  }

  onSaveForm(): void {
    if (this.courseForm.valid) {

        const item = { ...this.course, ...this.courseForm.value };

        if (item.id === '0') {
          this.courseService.createCourse(item)
            .subscribe({
              next: () => this.onSaveComplete(),
              error: err => this.errorMessage = err
            });
        } else {
          this.courseService.updateCourse(item)
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
    this.courseForm.reset();
    this.router.navigate([`/${Course.PATH_URL}`]);
  }

  gotoList(): void {
    // Reset the form to clear the flags
    this.courseForm.reset();
    this.router.navigate([`/${Course.PATH_URL}`]);
  }
}
