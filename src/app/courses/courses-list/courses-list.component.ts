import { Component } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Course, ICourseExtended } from '../../models/course.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.scss']
})
export class CoursesListComponent {

  private courseCollection: AngularFirestoreCollection<Course>;
  courses: Observable<ICourseExtended[]>;

  constructor(private router: Router, afs: AngularFirestore) {
    this.courseCollection = afs.collection<Course>('courses');
    this.courses = this.courseCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Course;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
  }

  gotoCourse(course) {
    console.log(`goto ${course.id}`);
    this.router.navigate([`${Course.PATH_URL}/${course.id}`]);
  }

}
