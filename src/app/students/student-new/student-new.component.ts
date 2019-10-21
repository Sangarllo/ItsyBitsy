import { Component, OnInit } from '@angular/core';
import { StudentsService } from '../../services/students.service';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-student-new',
  templateUrl: './student-new.component.html',
  styleUrls: ['./student-new.component.scss']
})
export class StudentNewComponent implements OnInit {

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
