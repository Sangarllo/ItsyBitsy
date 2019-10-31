import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreModule, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { ICourse, Course } from '../models/course.model';

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

  getCourse(courseId: string) {
    return this.courseCollection.doc(courseId).snapshotChanges();
  }

  updateCourse(courseId: string, courseData: Course): void {
    this.courseDoc = this.courseCollection.doc(courseId);
    this.courseDoc.update(courseData);
  }

  createCourse(newCourse: ICourse): void {
    this.courseCollection.add(newCourse);
  }
}
