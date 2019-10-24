import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreModule } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { IStudent } from '../models/iStudent.interface';

const STUDENT_COLLECTION = 'students';


@Injectable({
  providedIn: 'root'
})
export class StudentsService {

  private studentCollection: AngularFirestoreCollection<IStudent>;

  constructor(private afs: AngularFirestore) {
    this.studentCollection = afs.collection<IStudent>(STUDENT_COLLECTION);
  }

  getStudent(studentId: string) {
    return this.studentCollection.doc(studentId).snapshotChanges();
  }

  saveStudent(newStudent: IStudent): void {
    this.studentCollection.add(newStudent);
  }
}
