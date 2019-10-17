import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreModule } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { IStudent } from '../models/iStudent.interface';

@Injectable({
  providedIn: 'root'
})
export class StudentsService {

  private studentCollection: AngularFirestoreCollection<any>;

  constructor(private afs: AngularFirestore) {
    this.studentCollection = afs.collection<any>('students');
  }

  saveStudent(newStudent: any): void {
    this.studentCollection.add(newStudent);
  }
}
