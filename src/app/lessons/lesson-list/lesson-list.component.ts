import { Component } from '@angular/core';
import { ILesson, Lesson } from '../../models/lesson.model';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lesson-list',
  templateUrl: './lesson-list.component.html',
  styleUrls: ['./lesson-list.component.scss']
})
export class LessonListComponent {

  private lessonCollection: AngularFirestoreCollection<Lesson>;
  lessons: Observable<ILesson[]>;

  constructor( afs: AngularFirestore, private router: Router) {
    this.lessonCollection = afs.collection<Lesson>('lessons');
    this.lessons = this.lessonCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Lesson;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
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
    this.router.navigate([`${Lesson.PATH_URL}/${lesson.id}`]);
  }

  gotoNew() {
    this.router.navigate([`${Lesson.PATH_URL}/0/editar`]);
  }
}
