import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreModule } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { ITeacher } from '../models/iTeacher.interface';


@Injectable({
  providedIn: 'root'
})
export class TeachersService {

  private teacherCollection: AngularFirestoreCollection<ITeacher>;

  constructor(private afs: AngularFirestore) {
    this.teacherCollection = afs.collection<ITeacher>('teachers');
  }

  saveTeacher(newTeacher: ITeacher): void {
    this.teacherCollection.add(newTeacher);
  }
}
