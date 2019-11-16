import { Component, OnInit } from '@angular/core';
import { Course } from '../../models/course.model';
import { CoursesService } from '../../services/courses.service';
import { ActivatedRoute, Router } from '@angular/router';
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
    private router: Router,
  ) { }

  ngOnInit() {
    this.courseId = this.route.snapshot.paramMap.get('id');
    console.log(`courseId: ${this.courseId}`);
    this.coursesService.getCourse(this.courseId)
    .subscribe({
      next: course => this.course = course,
      error: err => this.errorMessage = err
    });
  }

  selectStudent(userDetails: UserDetails) {
    console.log(`Student selected on course-add-student: ${userDetails.displayName}`);

    if (!this.isInArray(userDetails)) {
      this.course.studentList.push(userDetails);
      this.coursesService.updateCourse(this.course)
        .subscribe( (course: Course) => {
          this.course = course;
        });
    }
  }

  applyStyles(userDetails: UserDetails) {
    const styles = {
      'background-image': `url("${userDetails.photoURL}")`,
      'background-size': 'cover'
    };
    return styles;
  }

  gotoUserDetails(userDetails: UserDetails) {
    console.log(`goto ${userDetails.uid}`);
    this.router.navigate([`${UserDetails.PATH_URL}/${userDetails.uid}`]);
  }

  private isInArray(userDetails: UserDetails): boolean {
    let isInArray: boolean = false;
    this.course.studentList.forEach(student => {
      console.log(`comparing: ${student.uid} === ${userDetails.uid}`);
      if ( student.uid === userDetails.uid ) {
        isInArray = true;
      }
    });
    return isInArray;
  }

}
