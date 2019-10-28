import { Component, OnInit } from '@angular/core';
import { StudentsService } from '../../services/students.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Avatar } from '../../models/avatar.model';

@Component({
  selector: 'app-student-new',
  templateUrl: './student-new.component.html',
  styleUrls: ['./student-new.component.scss']
})
export class StudentNewComponent implements OnInit {

  studentForm: FormGroup;
  avatares: Avatar[] = Avatar.getAvatares();

  constructor(
    private fb: FormBuilder,
    private studentService: StudentsService,
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

    this.studentForm.patchValue({
      photoURL: Avatar.getDefault().path,
    });
  }

  ngOnInit() {
  }

  onResetForm() {
    this.studentForm.reset();
  }

  public onSaveForm() {
    console.log('Student Form: ', this.studentForm.value);
    this.studentService.createStudent(this.studentForm.value);
    this.router.navigate(['/estudiantes']);
  }

}
