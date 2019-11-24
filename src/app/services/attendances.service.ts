import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreModule, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { IAttendance, Attendance, Status } from '../models/attendance.model';
import { Lesson } from '../models/lesson.model';
import { UserDetails } from '../models/user.model';
import { UserService } from './user.service';

const ATTENDANCE_COLLECTION = 'attendances';

const ATTENDANCES: Attendance[] = [{
    id: '0',
    current: true,
    lessonId: '6GrdSohoIeUwMVSxr0R5',
    studentId: 'tKYNcTLPvbHFrZdChxb9',
    studentName: 'María Pérez',
    studentImage: 'assets/avatar/063-girl-7.png',
    status: Status.Programada,
    comment: '',
  },  {
    id: '1',
    current: true,
    lessonId: '6GrdSohoIeUwMVSxr0R5',
    studentId: 'u03QEgXkBmjb7ISl9Ceq',
    studentName: 'Anita Dinamita',
    studentImage: 'assets/avatar/002-girl.png',
    status: Status.Anulada,
    comment: '',
  },  {
    id: '2',
    current: true,
    lessonId: '6GrdSohoIeUwMVSxr0R5',
    studentId: '2I7F1hzAPHloVkNqomPU',
    studentName: 'Pedro Fernández',
    studentImage: 'assets/avatar/068-girl-8.png',
    status: Status.Programada,
    comment: '',
  },
];

@Injectable({
  providedIn: 'root'
})
export class AttendancesService {

  private attendanceCollection: AngularFirestoreCollection<IAttendance>;
  private attendanceDoc: AngularFirestoreDocument<IAttendance>;

  constructor(
    private afs: AngularFirestore,
    private userService: UserService,
  ) {
  }

  getAttendancesByLesson(lesson: Lesson): Observable<IAttendance[]> {

    this.attendanceCollection = this.afs.collection(
      ATTENDANCE_COLLECTION,
      ref => ref.where('lessonId', '==', lesson.id)
                .orderBy('date')
    );

    return this.attendanceCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as IAttendance;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
  }

  getAttendancesByLesson_MOCK(lesson: Lesson): Observable<IAttendance[]> {
    return of(ATTENDANCES);
  }


  getAttendance(lesson: Lesson, attendanceId: string): Observable<any> {
    if (attendanceId === '0') {
      const studentDefault = this.userService.initialize();
      return of(this.initialize(lesson, studentDefault));
    } else {
      this.attendanceCollection = this.afs.collection(
        ATTENDANCE_COLLECTION,
        ref => ref.where('lessonId', '==', lesson.id)
      );
      return this.attendanceCollection.doc(attendanceId).valueChanges();
    }
  }

  updateAttendance(lesson: Lesson, attendance: Attendance): Observable<Attendance> {
    this.attendanceCollection = this.afs.collection(
      ATTENDANCE_COLLECTION,
      ref => ref.where('lessonId', '==', lesson.id)
    );
    this.attendanceDoc = this.attendanceCollection.doc(attendance.id);
    this.attendanceDoc.update(attendance);
    return of(attendance);
  }

  createAttendance(lesson: Lesson, attendance: Attendance): Observable<Attendance> {
    // Persist a document id
    attendance.id = this.afs.createId();
    this.attendanceCollection = this.afs.collection(
      ATTENDANCE_COLLECTION,
      ref => ref.where('lessonId', '==', lesson.id)
    );
    this.attendanceCollection.doc(attendance.id).set(attendance);
    return of(attendance);
  }

  // TODO: añadir parámetro student
  deleteAttendance(lesson: Lesson, id: string): Observable<{}> {
    this.attendanceCollection = this.afs.collection(
      ATTENDANCE_COLLECTION,
      ref => ref.where('lessonId', '==', lesson.id)
    );

    this.attendanceDoc = this.attendanceCollection.doc(id);
    this.attendanceDoc.delete();
    return of({});
  }

  public initialize(lesson: Lesson | null, student: UserDetails): Attendance {
    // Return an initialized object
    return {
      id: '0',
      current: true,
      lessonId: (lesson == null) ? '0' : lesson.id,
      studentId: student.uid,
      studentName: student.displayName,
      studentImage: student.photoURL,
      status: Status.Programada,
      comment: ''
    };
  }

  public fromUserToAttendanceArray(usersDetail: UserDetails[]): Attendance[] {

    const attendanceArray: Attendance[] = [];

    usersDetail.forEach(userDetail => {
      const newAttendance = this.initialize(null, userDetail);
      attendanceArray.push(newAttendance);
    });

    return attendanceArray;
  }

}
