import { Component, OnInit } from '@angular/core';
import { StudentsService } from '../../services/students.service';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-student-new',
  templateUrl: './student-new.component.html',
  styleUrls: ['./student-new.component.scss']
})
export class StudentNewComponent implements OnInit {

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
    private router: Router
  ) {
    this.studentForm = this.createFormGroup();
  }

  ngOnInit() {
  }

  onResetForm() {
    this.studentForm.reset();
  }

  public onSaveForm() {
    this.studentService.saveStudent(this.studentForm.value);
    this.router.navigate(['/estudiantes']);
  }

}
