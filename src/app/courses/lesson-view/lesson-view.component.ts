import { Component, Input, OnInit } from '@angular/core';

import { UserService } from '../../services/user.service';
import { UserDetails } from '../../models/user.model';
import { Lesson } from '../../models/lesson.model';
import { Course } from '../../models/course.model';
import { DatesService } from '../../services/dates.service';
import Swal from 'sweetalert2';
import { LessonsService } from '../../services/lessons.service';

@Component({
  selector: 'app-lesson-view',
  templateUrl: './lesson-view.component.html',
  styleUrls: ['./lesson-view.component.scss']
})
export class LessonViewComponent implements OnInit {

  @Input() course: Course;
  @Input() lesson: Lesson;
  teacher: UserDetails;

  constructor(
    private userService: UserService,
    private lessonsSvc: LessonsService,
    private datesService: DatesService
  ) {
  }

  ngOnInit() {
    this.userService.getUserDetails(this.lesson.teacherId)
    .subscribe( (teacher: UserDetails) => {
      this.teacher = teacher;
    });
  }
}
