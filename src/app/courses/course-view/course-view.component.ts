import { Component, Input, OnInit } from '@angular/core';
import { Course } from '../../models/course.model';
import { UserService } from '../../services/user.service';
import { UserDetails } from '../../models/user.model';
import { LessonsService } from '../../services/lessons.service';
import { Lesson, ILesson, Status } from '../../models/lesson.model';
import { Router } from '@angular/router';
import { DatesService } from '../../services/dates.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-course-view',
  templateUrl: './course-view.component.html',
  styleUrls: ['./course-view.component.scss']
})
export class CourseViewComponent implements OnInit {

  @Input() course: Course;
  teacher: UserDetails;
  nextLessons: ILesson[] = [];

  constructor(
    private userService: UserService,
    private lessonsSvc: LessonsService,
    private dateSvc: DatesService,
    private router: Router
  ) {
  }

  ngOnInit() {
    console.log(`teacherId: ${this.course.teacherId}`);

    this.userService.getUserDetails(this.course.teacherId)
    .subscribe( (teacher: UserDetails) => {
      this.teacher = teacher;
    });

    this.lessonsSvc.getNextLessons(this.course, 1)
      .subscribe( (lessons: ILesson[]) => {

        lessons.forEach(lesson => {
          lesson.date = this.dateSvc.fromFirebaseDate(lesson.date);
        });

        this.nextLessons = lessons;
      });
  }

  viewLesson(lesson: Lesson) {
    this.router.navigate([`/${Course.PATH_URL}/${this.course.id}/${Lesson.PATH_URL}/${lesson.id}`]);
  }

  editLesson(lesson: Lesson) {
    this.router.navigate([`/${Course.PATH_URL}/${this.course.id}/${Lesson.PATH_URL}/${lesson.id}/editar`]);
  }

  deleteLesson(lesson: Lesson) {
    Swal.fire({
      title: '¿Estás seguro?',
      icon: 'info',
      html:
      `Si pulsas OK, esta clase será <b>eliminada</b>`,
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: `OK`
    }).then((result) => {
      if (result.value) {

        lesson.current = false;
        lesson.status = Status.Eliminada;

        this.lessonsSvc.updateLesson(this.course, lesson)
          .subscribe( () => {
            Swal.fire(
              'Atención',
              `La lección ha sido eliminada.`,
              'success'
            );
          });
      }
    });
  }

}
