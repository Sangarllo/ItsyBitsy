import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreModule, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';
import { IStudent, Student, IStudentData } from '../models/student.model';
import { Avatar } from '../models/avatar.model';
import { Fare } from '../models/fare';


const STUDENT_COLLECTION = 'students';

@Injectable({
  providedIn: 'root'
})
export class StudentsService {

  private studentCollection: AngularFirestoreCollection<IStudent>;
  private studentDoc: AngularFirestoreDocument<IStudent>;

  constructor(private afs: AngularFirestore) {
    this.studentCollection = afs.collection<IStudent>(STUDENT_COLLECTION);
  }

  getStudent(studentId: string): Observable<any> {
    if (studentId === '0') {
      return of(this.initialize());
    } else {
      return this.studentCollection.doc(studentId).valueChanges();
    }
  }

  deleteStudent(id: string): Observable<{}> {
    this.studentDoc = this.studentCollection.doc(id);
    this.studentDoc.delete();
    return of({});
  }

  updateStudent(student: Student): Observable<Student> {
    this.studentDoc = this.studentCollection.doc(student.id);
    this.studentDoc.update(student);
    return of(student);
  }

  createStudent(student: Student): Observable<Student> {
    // Persist a document id
    student.id = this.afs.createId();
    this.studentCollection.doc(student.id).set(student);
    return of(student);
  }

  private initialize(): Student {
    // Return an initialized object
    return {
      id: '0',
      displayName: '',
      photoURL: Avatar.getRandom().path,
      email: '',
      phone: '',
      contact: '',
      fare: Fare.getDefault().name
    };
  }
}
