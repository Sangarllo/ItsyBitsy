import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreModule, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';
import { ICON_REGISTRY_PROVIDER } from '@angular/material/icon';
import { Icon } from '../models/image.model';
import { Lesson, Status } from '../models/lesson.model';
import { UserDetails } from '../models/user.model';
import { Teacher } from '../models/teacher.model';
import { Course } from '../models/course.model';
import { map } from 'rxjs/operators';
import { UserService } from './user.service';
import { Attendance } from '../models/attendance.model';
import { AttendancesService } from './attendances.service';

const LESSON_COLLECTION = 'lessons';


@Injectable({
  providedIn: 'root'
})
export class LessonsService {

  private lessonCollection: AngularFirestoreCollection<Lesson>;
  private lessonDoc: AngularFirestoreDocument<Lesson>;

  constructor(
    private afs: AngularFirestore,
    private attendanceService: AttendancesService) {
  }

  getAllLessons(course: Course): Observable<Lesson[]> {
    this.lessonCollection = this.afs.collection(
      LESSON_COLLECTION,
      ref => ref.where('courseId', '==', course.id)
                .where('current', '==', true)
                .orderBy('date')
    );

    return this.lessonCollection.valueChanges();
  }


  getLessonsByCourseId(course: Course): Observable<Lesson[]> {

    this.lessonCollection = this.afs.collection(
      LESSON_COLLECTION,
      ref => ref.where('courseId', '==', course.id)
                .where('current', '==', true)
                .orderBy('date')
    );

    return this.lessonCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Lesson;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
  }


  getLesson(course: Course, lessonId: string): Observable<any> {
    if (lessonId === '0') {
      return of(this.initialize(course, lessonId));
    } else {
      this.lessonCollection = this.afs.collection(
        LESSON_COLLECTION,
        ref => ref.where('courseId', '==', course.id)
      );
      return this.lessonCollection.doc(lessonId).valueChanges();
    }
  }

  getLastLessons(course: Course, limit: number): Observable<Lesson[]> { {
      this.lessonCollection = this.afs.collection(
        LESSON_COLLECTION,
        ref => ref.where('courseId', '==', course.id)
                  .where('current', '==', true)
                  .where('date', '<=', new Date())
                  .limit(limit)
                  .orderBy('date', 'asc')
      );
      return this.lessonCollection.valueChanges();
    }
  }

  getNextLessons(course: Course, limit: number): Observable<Lesson[]> { {
    this.lessonCollection = this.afs.collection(
      LESSON_COLLECTION,
      ref => ref.where('courseId', '==', course.id)
                .where('current', '==', true)
                .where('date', '>=', new Date())
                .limit(limit)
                .orderBy('date', 'asc')
    );
    return this.lessonCollection.valueChanges();
  }
}


  updateLesson(course: Course, lesson: Lesson): Observable<Lesson> {
    this.lessonCollection = this.afs.collection(
      LESSON_COLLECTION,
      ref => ref.where('courseId', '==', course.id)
    );
    this.lessonDoc = this.lessonCollection.doc(lesson.id);
    this.lessonDoc.update(lesson);
    return of(lesson);
  }

  createLesson(course: Course, lesson: Lesson): Observable<Lesson> {
    // Persist a document id
    lesson.id = this.afs.createId();
    this.lessonCollection = this.afs.collection(
      LESSON_COLLECTION,
      ref => ref.where('courseId', '==', course.id)
    );
    this.lessonCollection.doc(lesson.id).set(lesson);
    return of(lesson);
  }

  deleteLesson(course: Course, id: string): Observable<{}> {
    this.lessonCollection = this.afs.collection(
      LESSON_COLLECTION,
      ref => ref.where('courseId', '==', course.id)
    );

    this.lessonDoc = this.lessonCollection.doc(id);
    this.lessonDoc.delete();
    return of({});
  }

  private initialize(course: Course, lessonId: string): Lesson {
    // Return an initialized object
    return {
      id: '0',
      current: true,
      courseId: course.id,
      status: Status.Programada,
      date: new Date(),
      teacherId: course.teacherId,
      classRoom: course.classRoom,
      material: '',
      startTime: course.startTime,
      endTime: course.endTime,
      attendancesIds: []
    };
  }
}
