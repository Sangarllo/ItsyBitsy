import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Teacher } from '../../models/teacher.model';
import { Course } from '../../models/course.model';
import { CoursesService } from '../../services/courses.service';
import { DatePipe } from '@angular/common';
import { DateAdapter } from '@angular/material/core';

@Component({
  selector: 'app-course-new',
  templateUrl: './course-new.component.html',
  styleUrls: ['./course-new.component.scss']
})
export class CourseNewComponent implements OnInit {

  courseForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private coursesService: CoursesService,
    private router: Router,
    private datePipe: DatePipe,
    private adapter: DateAdapter<any>
  ) {
    this.adapter.setLocale('es');
  }

  ngOnInit() {
    this.courseForm = this.fb.group({
      current: true,
      name: ['', Validators.required],
      startDate: [ new Date().toLocaleString(), Validators.required ],
      startTime: [ '00:00', Validators.required ],
      endDate: [ new Date().toLocaleString(), Validators.required ],
      endTime: [ '00:00', Validators.required ],
      teacher: [ Teacher.getDefault().displayName ],
    });
  }

  onResetForm() {
    this.courseForm.reset();
  }

  public onSaveForm() {
    console.log('Course Form: ', this.courseForm.value);

    const startDateFormat = this.datePipe.transform(this.courseForm.get('startDate').value, 'yyyy-MM-dd');
    console.log(`Start Date: ${startDateFormat}`);

    const endDateFormat = this.datePipe.transform(this.courseForm.get('endDate').value, 'yyyy-MM-dd');
    console.log(`End Date: ${endDateFormat}`);

    this.courseForm.patchValue({
      startDate: startDateFormat,
      endDate: endDateFormat
    });

    this.coursesService.createCourse(this.courseForm.value);
    this.router.navigate([`/${Course.PATH_URL}`]);
  }

}
