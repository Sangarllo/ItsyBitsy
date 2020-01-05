import { Component, Input, OnInit } from '@angular/core';

import { UserService } from '../../services/user.service';
import { UserDetails } from '../../models/user.model';
import { Lesson, Status } from '../../models/lesson.model';
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

  changeStatus(lesson: Lesson, status: string) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: `Si pulsas OK, esta clase será ${status}`,
      icon: 'info',
      html:
      `Si pulsas OK, esta clase será <b>${status}</b>`,
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: `OK`
    }).then((result) => {
      if (result.value) {

        switch ( status ) {
          case 'programada':
            lesson.status = Status.Programada;
            break;
          case 'realizada':
            lesson.status = Status.Realizada;
            break;
          case 'anulada':
            lesson.status = Status.Anulada;
            break;
          case 'eliminada':
            lesson.status = Status.Eliminada;
            break;
        }

        this.lessonsSvc.updateLesson(this.course, lesson)
          .subscribe( () => {
            Swal.fire(
              status,
              `La lección ha sido ${status}.`,
              'success'
            );
          });
      }
    });
  }


}
