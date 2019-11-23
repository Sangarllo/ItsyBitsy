import { Component, OnInit } from '@angular/core';
import { Lesson } from '../../models/lesson.model';
import { CoursesService } from '../../services/courses.service';
import { LessonsService } from '../../services/lessons.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Course } from 'src/app/models/course.model';

@Component({
  selector: 'app-lesson-detail',
  templateUrl: './lesson-detail.component.html',
  styleUrls: ['./lesson-detail.component.scss']
})
export class LessonDetailComponent implements OnInit {

  pageTitle = 'Detalles de la Clase';
  errorMessage: string;

  courseId: string;
  course: Course;

  lessonId: string;
  lesson: Lesson;

  constructor(
    private lessonsService: LessonsService,
    private coursesService: CoursesService,
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
          next: lesson => this.lesson = lesson,
          error: err => this.errorMessage = err
        });
      },
      error: err => this.errorMessage = err
    });

  }

  gotoEdition() {
    this.router.navigate([`/${Course.PATH_URL}/${this.courseId}/${Lesson.PATH_URL}/${this.lessonId}/editar`]);
  }

  gotoEditStudentList() {
    this.router.navigate([`/${Course.PATH_URL}/${this.courseId}/${Lesson.PATH_URL}/${this.lessonId}/estudiantes`]);
  }

}
