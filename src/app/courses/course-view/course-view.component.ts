import { Component, Input, OnInit } from '@angular/core';
import { Course } from '../../models/course.model';
import { UserService } from '../../services/user.service';
import { UserDetails } from '../../models/user.model';

@Component({
  selector: 'app-course-view',
  templateUrl: './course-view.component.html',
  styleUrls: ['./course-view.component.scss']
})
export class CourseViewComponent implements OnInit {

  @Input() course: Course;
  teacher: UserDetails;

  constructor(
    private userService: UserService
  ) {
  }

  ngOnInit() {
    console.log(`teacherId: ${this.course.teacherId}`);
    this.userService.getUserDetails(this.course.teacherId)
    .subscribe( (teacher: UserDetails) => {
      this.teacher = teacher;
    });
  }
}
