import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreModule, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';
import { ICourse, Course } from '../models/course.model';
import { ICON_REGISTRY_PROVIDER } from '@angular/material/icon';
import { Icon } from '../models/image.model';

const COURSE_COLLECTION = 'courses';


@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  private courseCollection: AngularFirestoreCollection<ICourse>;
  private courseDoc: AngularFirestoreDocument<ICourse>;

  constructor(private afs: AngularFirestore) {
    this.courseCollection = afs.collection<ICourse>(COURSE_COLLECTION);
  }

  getCourse(id: string): Observable<any> {
    if (id === '0') {
      return of(this.initialize());
    } else {
      return this.courseCollection.doc(id).valueChanges();
    }
  }

  updateCourse(course: Course): Observable<Course> {
    this.courseDoc = this.courseCollection.doc(course.id);
    this.courseDoc.update(course);
    return of(course);
  }

  createCourse(course: Course): Observable<Course> {
    // Persist a document id
    course.id = this.afs.createId();
    this.courseCollection.doc(course.id).set(course);
    return of(course);
  }

  deleteCourse(id: string): Observable<{}> {
    this.courseDoc = this.courseCollection.doc(id);
    this.courseDoc.delete();
    return of({});
  }

  private initialize(): Course {
    // Return an initialized object
    return {
      current: true,
      id: '0',
      name: '',
      image: Icon.getDefault().path,
      startDate: new Date().toString().substring(0, 10),
      startTime: '00:00',
      endDate: new Date().toString().substring(0, 10),
      endTime: '00:00',
      teacher: ''
    };
  }
}
