import { Component, OnInit } from '@angular/core';
import { Lesson } from '@models/lesson.model';
import { CoursesService } from '@services/courses.service';
import { LessonsService } from '@services/lessons.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Course } from '@models/course.model';
import { DatesService } from '@services/dates.service';
import { Attendance } from '@models/attendance.model';
import { AttendancesService } from '@services/attendances.service';

@Component({
  selector: 'app-lesson-detail-view',
  templateUrl: './lesson-detail-view.component.html',
  styleUrls: ['./lesson-detail-view.component.scss']
})
export class LessonDetailView implements OnInit {

  pageTitle = 'Detalles de la Clase';
  errorMessage: string;

  courseId: string;
  course: Course;

  lessonId: string;
  lesson: Lesson;

  constructor(
    private dateSvc: DatesService,
    private coursesService: CoursesService,
    private lessonsService: LessonsService,
    private attendancesSvc: AttendancesService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {

    this.courseId = this.route.snapshot.paramMap.get('courseId');
    this.lessonId = this.route.snapshot.paramMap.get('lessonId');

    this.coursesService.getCourse(this.courseId)
    .subscribe({
      next: course => {
        this.course = course;
        this.lessonsService.getLesson(this.course, this.lessonId)
        .subscribe({
          next: lesson => {
            this.lesson = lesson;
            this.pageTitle = `Detalles de la clase del día `;
            this.lesson.date = this.dateSvc.fromFirebaseDate(this.lesson.date);
          },
          error: err => this.errorMessage = err
        });
      },
      error: err => this.errorMessage = err
    });

  }

  applyStyles(course: Course) {
    const styles = {
      'background-image': `url("${course.image}")`,
      'background-size': 'cover'
    };
    return styles;
  }

  gotoEdition() {
    this.router.navigate([`/${Course.PATH_URL}/${this.courseId}/${Lesson.PATH_URL}/${this.lessonId}/editar`]);
  }

  gotoCourse() {
    this.router.navigate([`/${Course.PATH_URL}/${this.courseId}`]);
  }

  public gotoDashboard() {
    this.router.navigate([`/usuarios/dashboard`]);
  }

}
