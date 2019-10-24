import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreModule, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { IStudent, Student } from '../models/student.model';

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

  getStudent(studentId: string) {
    return this.studentCollection.doc(studentId).snapshotChanges();
  }

  updateStudent(studentId: string, studentData: Student): void {
    this.studentDoc = this.studentCollection.doc(studentId);
    this.studentDoc.update(studentData);
  }

  createStudent(newStudent: IStudent): void {
    this.studentCollection.add(newStudent);
  }
}
