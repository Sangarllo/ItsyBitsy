import { Component, OnInit } from '@angular/core';
import { CoursesService } from '../../services/courses.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Course } from '../../models/course.model';


@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.scss']
})
export class CourseDetailComponent implements OnInit {

  courseId: string;
  course: Course;

  constructor(
    private coursesService: CoursesService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.courseId = this.route.snapshot.paramMap.get('id');
    this.coursesService.getCourse(this.courseId)
      .subscribe( (course) => {
        this.course = new Course(
          course.payload.data()[Course.FIELD_CURRENT],
          course.payload.data()[Course.FIELD_NAME],
          course.payload.data()[Course.FIELD_START_DATE],
          course.payload.data()[Course.FIELD_START_TIME],
          course.payload.data()[Course.FIELD_END_DATE],
          course.payload.data()[Course.FIELD_END_TIME],
          course.payload.data()[Course.FIELD_TEACHER]
        );
      });
  }

  gotoEdition() {
    this.router.navigate([`/${Course.PATH_URL}/${this.courseId}/editar`]);
  }

}
