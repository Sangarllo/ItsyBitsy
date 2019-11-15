import { Component, OnInit } from '@angular/core';
import { Course } from '../../models/course.model';
import { CoursesService } from '../../services/courses.service';
import { ActivatedRoute } from '@angular/router';
import { UserDetails } from '../../models/user.model';
import { UserService } from '../../services/user.service';


@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.scss']
})
export class AddStudentComponent implements OnInit {

  pageTitle = 'Detalles del Curso';
  errorMessage: string;

  courseId: string;
  course: Course;

  STUDENTS: UserDetails[];

  constructor(
    private coursesService: CoursesService,
    private userService: UserService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.courseId = this.route.snapshot.paramMap.get('id');
    console.log(`courseId: ${this.courseId}`);
    this.coursesService.getCourse(this.courseId)
    .subscribe({
      next: course => this.course = course,
      error: err => this.errorMessage = err
    });

    this.userService.getStudents()
    .subscribe((students: UserDetails[]) => {
      this.STUDENTS = students;
    });

  }

}
