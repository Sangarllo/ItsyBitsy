import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreModule, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { IAttendance, Attendance, Status } from '../models/attendance.model';
import { Lesson } from '../models/lesson.model';
import { UserDetails } from '../models/user.model';
import { UserService } from './user.service';
import { LessonsService } from './lessons.service';
import { Course } from '../models/course.model';

const ATTENDANCE_COLLECTION = 'attendances';

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

  createAttendance(lessonId: string, attendance: Attendance): Observable<Attendance> {
    // Persist a document id
    attendance.id = this.afs.createId();
    this.attendanceCollection = this.afs.collection(
      ATTENDANCE_COLLECTION,
      ref => ref.where('lessonId', '==', lessonId)
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

  public fromUserToAttendanceArray(course: Course, lessonId: string): Attendance[] {

    const studentList: UserDetails[] = course.studentList;
    const attendanceArray: Attendance[] = [];

    studentList.forEach(userDetail => {
      const newAttendance: Attendance = {
        id: this.afs.createId(),
        current: true,
        lessonId,
        studentId: userDetail.uid,
        studentName: userDetail.displayName,
        studentImage: userDetail.photoURL,
        status: Status.Programada,
        comment: ''
      };

      this.createAttendance(lessonId, newAttendance)
        .subscribe((attendanceCreated: Attendance) => {
          attendanceArray.push(attendanceCreated);
      });

    });

    return attendanceArray;
  }

}
