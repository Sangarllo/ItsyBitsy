import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreModule,
  AngularFirestoreDocument
} from '@angular/fire/firestore';
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
    private userService: UserService
  ) {}

  getAllAttendancesByLesson(lesson: Lesson): Observable<Attendance[]> {
    this.attendanceCollection = this.afs.collection(
      ATTENDANCE_COLLECTION,
      ref => ref.where('lessonId', '==', lesson.id)
    );

    return this.attendanceCollection.snapshotChanges().pipe(
      map(actions =>
        actions.map(a => {
          const data = a.payload.doc.data() as Attendance;
          const id = a.payload.doc.id;
          return { id, ...data };
        })
      )
    );
  }

  getAllAttendancesByCourse(course: Course): Observable<Attendance[]> {
    this.attendanceCollection = this.afs.collection(
      ATTENDANCE_COLLECTION,
      ref => ref.where('courseId', '==', course.id)
    );

    return this.attendanceCollection.snapshotChanges().pipe(
      map(actions =>
        actions.map(a => {
          const data = a.payload.doc.data() as Attendance;
          const id = a.payload.doc.id;
          return { id, ...data };
        })
      )
    );
  }


  getAllAttendancesByUser(userDetails: UserDetails, dateIni: Date, dateEnd: Date): Observable<Attendance[]> {
    this.attendanceCollection = this.afs.collection(
      ATTENDANCE_COLLECTION,
      ref => ref.where('studentId', '==', userDetails.uid)
                .where('lessonDate', '>=', dateIni)
                .where('lessonDate', '<=', dateEnd)
    );

    return this.attendanceCollection.snapshotChanges().pipe(
      map(actions =>
        actions.map(a => {
          const data = a.payload.doc.data() as Attendance;
          const id = a.payload.doc.id;
          return { id, ...data };
        })
      )
    );
  }

  getAllAttendancesByMonth(dateIni: Date, dateEnd: Date): Observable<Attendance[]> {
    this.attendanceCollection = this.afs.collection(
      ATTENDANCE_COLLECTION,
      ref => ref.where('lessonDate', '>=', dateIni)
                .where('lessonDate', '<=', dateEnd)
    );

    return this.attendanceCollection.snapshotChanges().pipe(
      map(actions =>
        actions.map(a => {
          const data = a.payload.doc.data() as Attendance;
          const id = a.payload.doc.id;
          return { id, ...data };
        })
      )
    );
  }

getAttendance(course: Course, lesson: Lesson, attendanceId: string): Observable<any> {
    if (attendanceId === '0') {
      const studentDefault = this.userService.initialize();
      return of(this.initialize(course, lesson, studentDefault));
    } else {
      this.attendanceCollection = this.afs.collection(
        ATTENDANCE_COLLECTION,
        ref => ref.where('lessonId', '==', lesson.id)
                  .where('courseId', '==', course.id)
      );
      return this.attendanceCollection.doc(attendanceId).valueChanges();
    }
  }

  updateAttendance(
    lesson: Lesson,
    attendance: Attendance
  ): Observable<Attendance> {
    this.attendanceCollection = this.afs.collection(
      ATTENDANCE_COLLECTION
    );
    this.attendanceDoc = this.attendanceCollection.doc(attendance.id);
    this.attendanceDoc.update(attendance);
    return of(attendance);
  }

  createAttendance(
    attendance: Attendance
  ): Observable<Attendance> {
    if (attendance.id === '0') {
      // If uid is not asigned, we get a GUID (item exists on UserDetails, not in Users)
      attendance.id = this.afs.createId();
    }

    this.attendanceCollection = this.afs.collection<Attendance>(
      ATTENDANCE_COLLECTION
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

  public initialize(course: Course, lesson: Lesson, student: UserDetails): Attendance {
    // Return an initialized object
    return {
      id: '0',
      current: true,
      courseId: course.id,
      courseName: course.name,
      lessonId: lesson.id,
      lessonDate: lesson.date,
      studentId: student.uid,
      studentName: student.displayName,
      studentImage: student.photoURL,
      status: Status.Prevista,
      comment: ''
    };
  }

  public createAttendancesFromStudentList( course: Course, createdLesson: Lesson ): string[] {
    const studentList: UserDetails[] = course.studentList;
    const attendancesIds: string[] = [];

    studentList.forEach(userDetail => {
      const newAttendanceId = this.afs.createId();
      attendancesIds.push(newAttendanceId);
      const newAttendance: Attendance = {
        id: newAttendanceId,
        current: true,
        courseId: course.id,
        courseName: course.name,
        lessonId: createdLesson.id,
        lessonDate: createdLesson.date,
        studentId: userDetail.uid,
        studentName: userDetail.displayName,
        studentImage: userDetail.photoURL,
        status: Status.Prevista,
        comment: ''
      };

      this.createAttendance(newAttendance).subscribe(
        () => {
          // console.log(` -> New attendance ${newAttendance.id} created`);
        }
      );
    });

    return attendancesIds;
  }
}
