import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Student, IStudent } from '../../models/student.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.scss']
})
export class StudentListComponent {

  private studentCollection: AngularFirestoreCollection<Student>;
  students: Observable<IStudent[]>;

  constructor( afs: AngularFirestore, private router: Router) {
    this.studentCollection = afs.collection<Student>('students');
    this.students = this.studentCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Student;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
  }

  applyStyles(student: Student) {
    const styles = {
      'background-image': `url("${student.photoURL}")`,
      'background-size': 'cover'
    };
    return styles;
  }

  gotoStudent(student) {
    console.log(`goto ${student.id}`);
    this.router.navigate([`${Student.PATH_URL}/${student.id}`]);
  }

  gotoNew() {
    this.router.navigate([`${Student.PATH_URL}/0/editar`]);
  }

}
