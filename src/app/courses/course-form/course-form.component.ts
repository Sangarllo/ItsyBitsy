import { Component, OnInit } from '@angular/core';
import { CoursesService } from '../../services/courses.service';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs';
import { Course } from '../../models/course.model';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss']
})
export class CourseFormComponent implements OnInit {

  courseForm: FormGroup;

  // course$: Observable<Course>;
  // course: Course;
  courseId: string;

  constructor(
    private fb: FormBuilder,
    private coursesService: CoursesService,
    private route: ActivatedRoute,
    private router: Router,
    private datePipe: DatePipe
  ) { }

  ngOnInit() {

    this.courseForm = this.fb.group({
      current: [],
      name: ['', Validators.required],
      startDate: ['', Validators.required],
      startTime: ['' ],
      endDate: ['', Validators.required ],
      endTime: [''],
      teacher: [''],
    });

    this.courseId = this.route.snapshot.paramMap.get('id');
    this.coursesService.getCourse(this.courseId)
      .subscribe( (course) => {
        this.courseForm.setValue({
          current: course.payload.data()[Course.FIELD_CURRENT],
          name: course.payload.data()[Course.FIELD_NAME],
          startDate: course.payload.data()[Course.FIELD_START_DATE],
          startTime: course.payload.data()[Course.FIELD_START_TIME],
          endDate: course.payload.data()[Course.FIELD_END_DATE],
          endTime: course.payload.data()[Course.FIELD_END_TIME],
          teacher: course.payload.data()[Course.FIELD_TEACHER],
        });
      });
  }

  onResetForm() {
    this.courseForm.reset();
  }

  public onSaveForm() {

    const startDateFormat = this.datePipe.transform(this.courseForm.get('startDate').value, 'yyyy-MM-dd');
    console.log(`Start Date: ${startDateFormat}`);

    const endDateFormat = this.datePipe.transform(this.courseForm.get('endDate').value, 'yyyy-MM-dd');
    console.log(`End Date: ${endDateFormat}`);

    this.courseForm.patchValue({
      startDate: startDateFormat,
      endDate: endDateFormat
    });


    this.coursesService.updateCourse(
      this.courseId,
      this.courseForm.value);
    this.router.navigate([`/${Course.PATH_URL}/${this.courseId}`]);
  }

}
