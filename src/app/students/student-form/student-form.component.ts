import { Component, OnInit } from '@angular/core';
import { StudentsService } from '../../services/students.service';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs';
import { Student } from '../../models/student.model';
import { Avatar } from '../../models/avatar.model';
import { Fare } from '../../models/fare';

@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.scss']
})
export class StudentFormComponent {

  AVATARES: Avatar[] = Avatar.getAvatares();
  FARES: Fare[] = Fare.getFares();

  studentForm: FormGroup;
  emailMessage: string;

  private validationMessages = {
    required: 'Introduce el email',
    email: 'Introduce un email válido.'
  };

  student$: Observable<Student>;
  student: Student;
  studentId: string;

  constructor(
    private fb: FormBuilder,
    private studentService: StudentsService,
    private route: ActivatedRoute,
    private router: Router
  ) {

    this.studentForm = this.fb.group({
      displayName: ['', Validators.required],
      photoURL: ['', Validators.required],
      email: ['', Validators.email],
      phone: [''],
      contact: [''],
      fare: [''],
    });

    this.studentId = this.route.snapshot.paramMap.get('id');
    this.studentService.getStudent(this.studentId)
      .subscribe( (student) => {
        this.studentForm.setValue({
          displayName: student.payload.data()[Student.FIELD_DISPLAY_NAME],
          photoURL: student.payload.data()[Student.FIELD_PHOTO_URL],
          email: student.payload.data()[Student.FIELD_EMAIL],
          phone: student.payload.data()[Student.FIELD_PHONE],
          contact: student.payload.data()[Student.FIELD_CONTACT],
          fare: student.payload.data()[Student.FIELD_FARE],
        });
      });
  }

  setMessage(c: AbstractControl): void {
    this.emailMessage = '';
    if ((c.touched || c.dirty) && c.errors) {
      this.emailMessage = Object.keys(c.errors).map(
        key => this.validationMessages[key]).join(' ');
    }
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
