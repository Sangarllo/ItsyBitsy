import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreModule, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';
import { ICON_REGISTRY_PROVIDER } from '@angular/material/icon';
import { Icon } from '../models/image.model';
import { ILesson, Lesson, Status } from '../models/lesson.model';
import { UserDetails } from '../models/user.model';
import { Teacher } from '../models/teacher.model';
import { Course } from '../models/course.model';

const LESSON_COLLECTION = 'lessons';


@Injectable({
  providedIn: 'root'
})
export class LessonsService {

  private lessonCollection: AngularFirestoreCollection<ILesson>;
  private lessonDoc: AngularFirestoreDocument<ILesson>;

  constructor(private afs: AngularFirestore) {
    this.lessonCollection = afs.collection<ILesson>(LESSON_COLLECTION);
  }

  getAllLessons(): Observable<ILesson[]> {
      return this.lessonCollection.valueChanges();
  }


  getLesson(id: string, course: Course): Observable<any> {
    if (id === '0') {
      return of(this.initialize(course));
    } else {
      return this.lessonCollection.doc(id).valueChanges();
    }
  }

  updateLesson(lesson: Lesson): Observable<Lesson> {
    this.lessonDoc = this.lessonCollection.doc(lesson.id);
    this.lessonDoc.update(lesson);
    return of(lesson);
  }

  createLesson(lesson: Lesson): Observable<Lesson> {
    // Persist a document id
    lesson.id = this.afs.createId();
    this.lessonCollection.doc(lesson.id).set(lesson);
    return of(lesson);
  }

  deleteLesson(id: string): Observable<{}> {
    this.lessonDoc = this.lessonCollection.doc(id);
    this.lessonDoc.delete();
    return of({});
  }

  private initialize(course: Course): Lesson {
    // Return an initialized object
    return {
      id: '0',
      current: true,
      courseId: course.id,
      status: Status.Planificada,
      date: new Date().toString(),
      teacherId: course.teacherId,
      material: '',
      startTime: course.startTime,
      endTime: course.endTime,
      studentList: course.studentList
    };
  }
}
