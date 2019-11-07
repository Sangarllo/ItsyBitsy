import { Component, OnInit } from '@angular/core';
import { ILesson, Lesson } from '../../models/lesson.model';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { Course } from '../../models/course.model';
import { CoursesService } from '../../services/courses.service';

@Component({
  selector: 'app-lesson-list',
  templateUrl: './lesson-list.component.html',
  styleUrls: ['./lesson-list.component.scss']
})
export class LessonListComponent implements OnInit {

  pageTitle = 'Listado de Clases';
  errorMessage: string;

  courseId: string;
  course: Course;

  private lessonCollection: AngularFirestoreCollection<Lesson>;
  lessons: Observable<ILesson[]>;

  constructor(
    afs: AngularFirestore,
    private coursesService: CoursesService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.lessonCollection = afs.collection<Lesson>('lessons');
    this.lessons = this.lessonCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Lesson;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
  }

  ngOnInit() {

    this.courseId = this.route.snapshot.paramMap.get('courseId');
    this.coursesService.getCourse(this.courseId)
    .subscribe({
      next: course => this.course = course,
      error: err => this.errorMessage = err
    });
  }

  applyStyles(lesson: Lesson) {
    const styles = {
      'background-image': `url("assets/section/lesson.png")`,
      'background-size': 'cover'
    };
    return styles;
  }

  gotoLesson(lesson) {
    console.log(`goto ${lesson.id}`);
    this.router.navigate([`/${Course.PATH_URL}/${this.course.id}/${Lesson.PATH_URL}/${lesson.id}`]);
  }

  gotoNewLesson() {
    this.router.navigate([`/${Course.PATH_URL}/${this.course.id}/${Lesson.PATH_URL}/0/editar`]);
  }
}
