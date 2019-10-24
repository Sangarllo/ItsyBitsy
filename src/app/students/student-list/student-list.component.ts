import { Component } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IStudent, IStudentExtended } from '../../models/iStudent.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.scss']
})
export class StudentListComponent {

  private studentCollection: AngularFirestoreCollection<IStudent>;
  students: Observable<IStudentExtended[]>;

  constructor(private router: Router, afs: AngularFirestore) {
    this.studentCollection = afs.collection<IStudent>('students');
    this.students = this.studentCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as IStudent;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
  }

  gotoStudent(student) {
    console.log(`goto ${student.id}`);
    this.router.navigate([`estudiantes/${student.id}`]);
  }

}
