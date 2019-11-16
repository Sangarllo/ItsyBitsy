import { Component, OnInit, OnDestroy } from '@angular/core';
import { Course } from 'src/app/models/course.model';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators, FormControlName } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CoursesService } from '../../services/courses.service';
import { Subscription } from 'rxjs';
import { Icon } from '../../models/image.model';
import { RandomGenerator } from '../../shared/random-generator';
import { UserDetails } from '../../models/user.model';
import { UserService } from '../../services/user.service';

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
  WEEK_DAY_ARRAY = Course.getAllWeekDay();

  TEACHERS: UserDetails[];

  private sub: Subscription;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private courseService: CoursesService) { }

  ngOnInit() {
    this.courseForm = this.fb.group({
      current: true,
      name: ['', [Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50)]],
      image: ['', Validators.required],
      weekDay: ['', Validators.required],
      startTime: ['', Validators.required],
      endTime: ['', Validators.required],
      teacherId: ['', Validators.required],
    });

    // Read the student Id from the route parameter
    this.sub = this.route.paramMap.subscribe(
      params => {
        const id = params.get('id');
        this.getCourse(id);
      }
    );

    this.userService.getTeachers()
    .subscribe((teachers: UserDetails[]) => {
      this.TEACHERS = teachers;
    });

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
      weekDay: this.course.weekDay,
      startTime: this.course.startTime,
      endTime: this.course.endTime,
      teacherId: this.course.teacherId
    });

    this.courseForm.controls[Course.FIELD_TEACHER_ID].setValue(this.course.teacherId);
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
