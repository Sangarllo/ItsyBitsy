import { Component, OnInit } from '@angular/core';
import { Lesson } from '../../models/lesson.model';
import { LessonsService } from '../../services/lessons.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-lesson-detail',
  templateUrl: './lesson-detail.component.html',
  styleUrls: ['./lesson-detail.component.scss']
})
export class LessonDetailComponent implements OnInit {

  pageTitle = 'Detalles de la Clase';
  errorMessage: string;

  lessonId: string;
  lesson: Lesson;

  constructor(
    private lessonsService: LessonsService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.lessonId = this.route.snapshot.paramMap.get('id');
    this.lessonsService.getLesson(this.lessonId)
    .subscribe({
      next: lesson => this.lesson = lesson,
      error: err => this.errorMessage = err
    });
  }

  gotoEdition() {
    this.router.navigate([`/${Lesson.PATH_URL}/${this.lessonId}/editar`]);
  }
}
