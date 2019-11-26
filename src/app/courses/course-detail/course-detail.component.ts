import { Component, OnInit } from '@angular/core';
import { CoursesService } from '../../services/courses.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Course } from '../../models/course.model';
import { Lesson } from 'src/app/models/lesson.model';


@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.scss']
})
export class CourseDetailComponent implements OnInit {

  pageTitle = 'Detalles del Curso';
  errorMessage: string;

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
    .subscribe({
      next: course => this.course = course,
      error: err => this.errorMessage = err
    });
  }

  applyStyles(course: Course) {
    const styles = {
      'background-image': `url("${course.image}")`,
      'background-size': 'cover'
    };
    return styles;
  }

  gotoEdition() {
    this.router.navigate([`/${Course.PATH_URL}/${this.courseId}/editar`]);
  }

  gotoCourses() {
    this.router.navigate([`/${Course.PATH_URL}`]);
  }

}
