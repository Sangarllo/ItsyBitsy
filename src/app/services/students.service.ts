import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreModule } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { IStudent } from '../models/iStudent.interface';

@Injectable({
  providedIn: 'root'
})
export class StudentsService {

  private studentCollection: AngularFirestoreCollection<IStudent>;

  constructor(private afs: AngularFirestore) {
    this.studentCollection = afs.collection<IStudent>('students');
  }

  saveStudent(newStudent: IStudent): void {
    this.studentCollection.add(newStudent);
  }
}
