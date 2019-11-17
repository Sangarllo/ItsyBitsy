import { Component, OnInit } from '@angular/core';
import { Course } from '../../models/course.model';
import { CoursesService } from '../../services/courses.service';
import { ActivatedRoute } from '@angular/router';
import { UserDetails } from '../../models/user.model';

@Component({
  selector: 'app-course-add-student',
  templateUrl: './course-add-student.component.html',
  styleUrls: ['./course-add-student.component.scss']
})
export class CourseAddStudentComponent implements OnInit {

  pageTitle = 'Detalles del Curso';
  errorMessage: string;

  courseId: string;
  course: Course;

  constructor(
    private coursesService: CoursesService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.courseId = this.route.snapshot.paramMap.get('id');
    this.coursesService.getCourse(this.courseId)
    .subscribe({
      next: course => this.course = course,
      error: err => this.errorMessage = err
    });
  }

  selectStudent(userDetails: UserDetails) {

    if (!this.isInArray(userDetails)) {
      this.course.studentList.push(userDetails);
      this.coursesService.updateCourse(this.course)
        .subscribe( (course: Course) => {
          this.course = course;
        });
    }
  }

  private isInArray(userDetails: UserDetails): boolean {
    let isInArray: boolean = false;
    this.course.studentList.forEach(student => {
      if ( student.uid === userDetails.uid ) {
        isInArray = true;
      }
    });
    return isInArray;
  }

}
