import { Component, Input, OnInit } from '@angular/core';

import { UserService } from '../../services/user.service';
import { UserDetails } from '../../models/user.model';
import { Lesson } from '../../models/lesson.model';

@Component({
  selector: 'app-lesson-view',
  templateUrl: './lesson-view.component.html',
  styleUrls: ['./lesson-view.component.scss']
})
export class LessonViewComponent implements OnInit {

  @Input() lesson: Lesson;
  teacher: UserDetails;

  constructor(
    private userService: UserService
  ) {
  }

  ngOnInit() {
    console.log(`teacherId: ${this.lesson.teacherId}`);
    this.userService.getUserDetails(this.lesson.teacherId)
    .subscribe( (teacher: UserDetails) => {
      this.teacher = teacher;
    });
  }
}
