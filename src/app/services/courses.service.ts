import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreModule, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';
import { ICourse, Course } from '@models/course.model';
import { ICON_REGISTRY_PROVIDER } from '@angular/material/icon';
import { Icon } from '@models/image.model';
import { UserDetails } from '@models/user.model';
import { map } from 'rxjs/operators';
import { CourseData } from '@models/report-summary';

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

  getAllCourses(orderByTeacher: boolean = false): Observable<Course[]> {

    if ( orderByTeacher ) {
      this.courseCollection = this.afs.collection(
        COURSE_COLLECTION,
        ref => ref.where('current', '==', true)
                  .orderBy('teacherId')
                  .orderBy('type')
                  .orderBy('name')
      );
    } else {
        this.courseCollection = this.afs.collection(
          COURSE_COLLECTION,
          ref => ref.where('current', '==', true)
                    .orderBy('type')
                    .orderBy('name')
        );
    }


    return this.courseCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Course;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
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
    const typeDefault = Course.getDefaultCourseType();
    const imageDefault = `assets/courses/${typeDefault}.png`;
    const classRoomDefault = Course.getDefaultClassRoom();

    return {
      current: true,
      id: '0',
      name: '',
      type: typeDefault,
      image: imageDefault,
      weekDay: Course.getDefaultWeekDay(),
      startTime: '00:00',
      endTime: '00:00',
      teacherId: '',
      classRoom: classRoomDefault,
      studentList: [],
      weekLesson: null,
      nextLesson: null
    };
  }

  getReportData(course: Course): CourseData {

    const type: string = course.type;
    const name: string = course.name;
    const scheduleDay = `${course.weekDay}`;
    const scheduleTime = `${course.startTime} - ${course.endTime}`;
    const teacher = course.teacherName;
    const nStudents = course.studentList.length;

    return {
      type,
      name,
      scheduleDay,
      scheduleTime,
      teacher,
      nStudents
    };
  }
}
