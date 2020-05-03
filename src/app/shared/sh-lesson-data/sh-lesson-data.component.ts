import { Component, Input, OnInit } from '@angular/core';
import { UserService } from '@services/user.service';
import { UserDetails } from '@models/user.model';
import { Lesson } from '@models/lesson.model';
import { Router } from '@angular/router';
import { LessonsService } from '@services/lessons.service';
import { Course } from '@models/course.model';


@Component({
  selector: 'app-sh-lesson-data',
  templateUrl: './sh-lesson-data.component.html',
  styleUrls: ['./sh-lesson-data.component.scss']
})
export class ShLessonDataComponent implements OnInit {

  @Input() course: Course;
  @Input() lesson: Lesson;
  @Input() enableEdition: boolean;
  teacher: UserDetails;

  constructor(
    private router: Router,
    private userService: UserService,
    private lessonSvc: LessonsService
  ) { }

  ngOnInit(): void {

    this.userService.getUserDetails(this.lesson.teacherId)
    .subscribe( (teacher: UserDetails) => {
      this.teacher = teacher;
    });
  }

  gotoEdition() {
    this.router.navigate([`/${Course.PATH_URL}/${this.course.id}/editar`]);
  }

  updateLesson(current: boolean) {
    this.lesson.current = current;
    this.lessonSvc.updateLesson( this.course, this.lesson )
      .subscribe( lesson => {
        this.lesson = lesson;
      });
  }

}
