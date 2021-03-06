import { Component, OnInit } from '@angular/core';
import { CoursesService } from '@services/courses.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Course } from '@models/course.model';


@Component({
  selector: 'app-course-detail-view',
  templateUrl: './course-detail-view.component.html',
  styleUrls: ['./course-detail-view.component.scss']
})
export class CourseDetailView implements OnInit {

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
      next: course => {
        this.course = course;
        this.pageTitle = `Detalles del curso ${this.course.name}`;
      },
      error: err => this.errorMessage = err
    });
  }

  public gotoDashboard() {
    this.router.navigate([`/usuarios/dashboard`]);
  }

}
