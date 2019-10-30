import { Component } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Student, IStudentExtended } from '../../models/student.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.scss']
})
export class StudentListComponent {

  private studentCollection: AngularFirestoreCollection<Student>;
  students: Observable<IStudentExtended[]>;

  constructor(private router: Router, afs: AngularFirestore) {
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
    this.router.navigate([`estudiantes/${student.id}`]);
  }

}
