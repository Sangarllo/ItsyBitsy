import { Component, OnInit } from '@angular/core';
import { StudentsService } from '../../services/students.service';
import { FormControl, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Student } from '../../models/student.model';
import { AngularFirestoreDocument, AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.scss']
})
export class StudentFormComponent {

  private itemDoc: AngularFirestoreDocument<Student>;
  student$: Observable<Student>;
  student: Student;
  studentId: string;

  createFormGroup() {
    return new FormGroup({
      displayName: new FormControl(''),
      photoURL: new FormControl(''),
      email: new FormControl(''),
      phone: new FormControl(''),
      contact: new FormControl(''),
      fare: new FormControl(''),
    });
  }

  // tslint:disable-next-line: member-ordering
  studentForm: FormGroup;
  constructor(
    private studentService: StudentsService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.studentForm = this.createFormGroup();
    this.studentId = this.route.snapshot.paramMap.get('id');
    this.studentService.getStudent(this.studentId)
      .subscribe( (student) => {
        this.studentForm.setValue({
          displayName: student.payload.data()['displayName'],
          photoURL: student.payload.data()['photoURL'],
          email: student.payload.data()['email'],
          phone: student.payload.data()['phone'],
          contact: student.payload.data()['contact'],
          fare: student.payload.data()['fare'],
        });
      });
  }

  onResetForm() {
    this.studentForm.reset();
  }

  public onSaveForm() {
    this.studentService.updateStudent(
      this.studentId,
      this.studentForm.value);
    this.router.navigate([`/estudiantes/${this.studentId}`]);
  }

}
