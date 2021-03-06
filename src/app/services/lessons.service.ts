import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreModule, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';
import { ICON_REGISTRY_PROVIDER } from '@angular/material/icon';
import { Lesson } from '@models/lesson.model';
import { UserDetails } from '@models/user.model';
import { Course } from '@models/course.model';
import { map } from 'rxjs/operators';
import { AttendancesService } from './attendances.service';
import { DatesService } from './dates.service';

const LESSON_COLLECTION = 'lessons';


@Injectable({
  providedIn: 'root'
})
export class LessonsService {

  private lessonCollection: AngularFirestoreCollection<Lesson>;
  private lessonDoc: AngularFirestoreDocument<Lesson>;

  constructor(
    private afs: AngularFirestore,
    private dateSvc: DatesService,
    private attendanceService: AttendancesService) {
  }

  auditAllLessons(limit: number): Observable<Lesson[]> {
    this.lessonCollection = this.afs.collection(
      LESSON_COLLECTION,
      ref => ref.orderBy('date', 'desc')
                .limit(limit)
    );

    return this.lessonCollection.valueChanges();
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

  getAllLessonsByDate(teacher: UserDetails, dateIni: Date, dateEnd: Date): Observable<Lesson[]> {

    dateIni.setHours(0, 0, 0, 0);
    dateEnd.setHours(23, 59, 59, 59);

    if ( teacher ) {
      this.lessonCollection = this.afs.collection(
        LESSON_COLLECTION,
        ref => ref.where('teacherId', '==', teacher.uid)
                  .where('current', '==', true)
                  .where('date', '>=', dateIni)
                  .where('date', '<=', dateEnd)
                  .orderBy('date')
                  .orderBy('startTime')
      );
    } else {
      this.lessonCollection = this.afs.collection(
        LESSON_COLLECTION,
        ref => ref.where('current', '==', true)
                  .where('date', '>=', dateIni)
                  .where('date', '<=', dateEnd)
                  .orderBy('date')
                  .orderBy('startTime')
      );
    }

    return this.lessonCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Lesson;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
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


  getLesson(course: Course, lessonId: string, nextWeek?: boolean): Observable<any> {
    if (lessonId === '0') {
      if ( nextWeek ) {
        return of(this.initialize(course, nextWeek = true));
      } else {
        return of(this.initialize(course, nextWeek = false));
      }
    } else {
      this.lessonCollection = this.afs.collection(
        LESSON_COLLECTION,
        ref => ref.where('courseId', '==', course.id)
      );
      return this.lessonCollection.doc(lessonId).valueChanges();
    }
  }

  getWeekLessons(course: Course, limit: number): Observable<Lesson[]> { {

    const dateLastSunday = new Date(this.dateSvc.getLastSunday().setHours(0, 0, 0));
    const dateWeekSaturday = new Date(this.dateSvc.getWeekSaturday().setHours(23, 59, 59));

    this.lessonCollection = this.afs.collection(
        LESSON_COLLECTION,
        ref => ref.where('courseId', '==', course.id)
                  .where('current', '==', true)
                  .where('date', '>=', dateLastSunday)
                  .where('date', '<=', dateWeekSaturday)

                  .limit(limit)
                  .orderBy('date', 'asc')
    );

    return this.lessonCollection.valueChanges();
    }
  }

  getNextLessons(course: Course, limit: number): Observable<Lesson[]> { {

    const dateWeekSunday = new Date(this.dateSvc.getWeekSunday().setHours(0, 0, 0));
    const dateNextSaturday = new Date(this.dateSvc.getNextSaturday().setHours(23, 59, 59));

    this.lessonCollection = this.afs.collection(
      LESSON_COLLECTION,
      ref => ref.where('courseId', '==', course.id)
                .where('current', '==', true)
                .where('date', '>=', dateWeekSunday)
                .where('date', '<=', dateNextSaturday)
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

  private initialize(course: Course, nextWeek: boolean): Lesson {

    let newDate = new Date();
    if ( nextWeek ) {
      newDate = this.dateSvc.getNextMonday();
    } else {
      newDate = this.dateSvc.getWeekMonday();
    }
    newDate.setDate(newDate.getDate() + (7 + Course.getWeekDayNumber(course.weekDay) - newDate.getDay()) % 7);
    newDate.setHours( +course.startTime.substr(0, 2), +course.startTime.substr(3, 2), 0);
    // Return an initialized object
    return {
      id: '0',
      current: true,
      creationDate: new Date(),
      courseId: course.id,
      date: newDate,
      teacherId: course.teacherId,
      classRoom: course.classRoom,
      material: '',
      startTime: course.startTime,
      endTime: course.endTime,
      attendancesIds: [],
      attendancesNames: [],
      attendancesReviewed: false,
    };
  }
}
