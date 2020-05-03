import { Component, OnInit, OnDestroy } from '@angular/core';
import { Course } from '@models/course.model';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators, FormControlName } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CoursesService } from '@services/courses.service';
import { Subscription } from 'rxjs';
import { Icon } from '@models/image.model';
import { RandomGenerator } from '@shared/random-generator';
import { UserDetails } from '@models/user.model';
import { UserService } from '@services/user.service';
import Swal from 'sweetalert2';

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
  COURSE_TYPE_ARRAY = Course.getAllCourseType();
  CLASSROOM_ARRAY = Course.getAllClassRoom();

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
      type: ['', Validators.required],
      weekDay: ['', Validators.required],
      startTime: ['', Validators.required],
      endTime: ['', Validators.required],
      teacherId: ['', Validators.required],
      classRoom: ['', Validators.required],
    });

    // Read the student Id from the route parameter
    this.sub = this.route.paramMap.subscribe(
      params => {
        const id = params.get('id');
        this.getCourse(id);
      }
    );

    this.userService.getAllTeachers()
    .subscribe((teachers: UserDetails[]) => {
      this.TEACHERS = teachers;
    });

  }

  changeImage(event) {
    const courseType = this.courseForm.get('type').value;
    this.course.image = `assets/courses/${courseType}.png`;
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
      type: this.course.type,
      weekDay: this.course.weekDay,
      startTime: this.course.startTime,
      endTime: this.course.endTime,
      teacherId: this.course.teacherId,
      classRoom: this.course.classRoom
    });

    // tslint:disable-next-line:no-string-literal
    this.courseForm.controls['teacherId'].setValue(this.course.teacherId);
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
    Swal.fire({
      icon: 'success',
      title: 'Datos guardados con éxito',
      text: `Los datos de ${this.course.name} se han guardado correctamente`,
      // footer: '<a href>Why do I have this issue?</a>'
    });
    this.router.navigate([`/${Course.PATH_URL}`]);
  }

  gotoList(): void {
    // Reset the form to clear the flags
    this.courseForm.reset();
    this.router.navigate([`/${Course.PATH_URL}`]);
  }

  goBack(): void {
    // Reset the form to clear the flags
    this.courseForm.reset();
    this.router.navigate([`/${Course.PATH_URL}/${this.course.id}`]);
  }

}
