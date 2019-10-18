import { Component, OnInit } from '@angular/core';
import { StudentsService } from '../../services/students.service';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.scss']
})
export class StudentFormComponent implements OnInit {

  createFormGroup() {
    return new FormGroup({
      name: new FormControl(''),
      surname: new FormControl(''),
    });
  }

  // tslint:disable-next-line: member-ordering
  studentForm: FormGroup;
  constructor(private studentService: StudentsService) {
    this.studentForm = this.createFormGroup();
  }

  ngOnInit() {
  }

  onResetForm() {
    this.studentForm.reset();
  }

  public onSaveForm() {
    this.studentService.saveStudent(this.studentForm.value);
  }

}
