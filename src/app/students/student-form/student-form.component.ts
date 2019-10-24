import { Component, OnInit } from '@angular/core';
import { StudentsService } from '../../services/students.service';
import { FormControl, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Student } from '../../models/iStudent.interface';
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
      name: new FormControl(''),
      surname: new FormControl(''),
    });
  }

  // tslint:disable-next-line: member-ordering
  studentForm: FormGroup;
  constructor(
    private studentService: StudentsService,
    private route: ActivatedRoute,
  ) {
    this.studentForm = this.createFormGroup();
    this.studentId = this.route.snapshot.paramMap.get('id');
    this.studentService.getStudent(this.studentId)
      .subscribe( (student) => {
        this.studentForm.setValue({
          name: student.payload.data()['name'],
          surname: student.payload.data()['surname']
        });
      });
  }

  onResetForm() {
    this.studentForm.reset();
  }

  public onSaveForm() {
    this.studentService.saveStudent(this.studentForm.value);
  }

}
