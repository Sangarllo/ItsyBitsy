import { Component, OnInit } from '@angular/core';
import { StudentsService } from '../../services/students.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs';
import { Student } from '../../models/student.model';
import { Avatar } from '../../models/avatar.model';

@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.scss']
})
export class StudentFormComponent {

  student$: Observable<Student>;
  student: Student;
  studentId: string;

  avatares: Avatar[] = Avatar.getAvatares();

  // tslint:disable-next-line: member-ordering
  studentForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private studentService: StudentsService,
    private route: ActivatedRoute,
    private router: Router
  ) {

    this.studentForm = this.fb.group({
      displayName: ['', Validators.required],
      photoURL: ['', Validators.required],
      email: [''],
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
