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

  private attendanceCollection: AngularFirestoreCollection<Attendance>;
  private attendanceDoc: AngularFirestoreDocument<Attendance>;

  constructor(
    private afs: AngularFirestore,
    private userService: UserService,
  ) {
  }

  getAllAttendances(lesson: Lesson): Observable<Attendance[]> {
    console.log(`lessonId: ${lesson.id}`);
    /*
    this.attendanceCollection = this.afs.collection(
      ATTENDANCE_COLLECTION,
      ref => ref.where('lessonId', '==', lesson.id)
                .orderBy('date')
    );
*/
    this.attendanceCollection = this.afs.collection(
      ATTENDANCE_COLLECTION
    );

    return this.attendanceCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Attendance;
        const id = a.payload.doc.id;
        return { id, ...data };
      })
      )
    );
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

    if ( attendance.id === '0') {
      // If uid is not asigned, we get a GUID (item exists on UserDetails, not in Users)
      attendance.id = this.afs.createId();
    }

    this.attendanceCollection = this.afs.collection<Attendance>(ATTENDANCE_COLLECTION);

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

  public initialize(lesson: Lesson, student: UserDetails): Attendance {
    // Return an initialized object
    return {
      id: '0',
      current: true,
      lessonId: lesson.id,
      studentId: student.uid,
      studentName: student.displayName,
      studentImage: student.photoURL,
      status: Status.Programada,
      comment: ''
    };
  }

  public createAttendancesFromStudentList(course: Course, lessonId: string): string[] {

    const studentList: UserDetails[] = course.studentList;
    const attendancesIds: string[] = [];

    studentList.forEach(userDetail => {
      const newAttendanceId = this.afs.createId();
      attendancesIds.push(newAttendanceId);
      const newAttendance: Attendance = {
        id: newAttendanceId,
        current: true,
        // tslint:disable-next-line:object-literal-shorthand
        lessonId: lessonId,
        studentId: userDetail.uid,
        studentName: userDetail.displayName,
        studentImage: userDetail.photoURL,
        status: Status.Programada,
        comment: ''
      };

      this.createAttendance(lessonId, newAttendance)
        .subscribe((attendanceCreated: Attendance) => {
          console.log(` -> New attendance ${newAttendance.id} created`);
          // attendancesIds.push(attendanceCreated);
      });
    });

    return attendancesIds;
  }

}
