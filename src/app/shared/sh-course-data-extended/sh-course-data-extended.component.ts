import { Component, Input, OnInit } from '@angular/core';
import { Course } from '@models/course.model';
import { UserService } from '@services/user.service';
import { UserDetails } from '@models/user.model';

@Component({
  selector: 'app-sh-course-data-extended',
  templateUrl: './sh-course-data-extended.component.html',
  styleUrls: ['./sh-course-data-extended.component.scss']
})
export class ShCourseDataExtendedComponent implements OnInit {

  @Input() course: Course;
  teacher: UserDetails;

  constructor(
    private userService: UserService,
  ) { }

  ngOnInit(): void {

    this.userService.getUserDetails(this.course.teacherId)
    .subscribe( (teacher: UserDetails) => {
      this.teacher = teacher;
    });
  }
}
