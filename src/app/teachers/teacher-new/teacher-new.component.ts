import { Component, OnInit } from '@angular/core';
import { TeachersService } from '../../services/teachers.service';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-teacher-new',
  templateUrl: './teacher-new.component.html',
  styleUrls: ['./teacher-new.component.scss']
})
export class TeacherNewComponent implements OnInit {

  createFormGroup() {
    return new FormGroup({
      name: new FormControl(''),
      surname: new FormControl(''),
    });
  }

  // tslint:disable-next-line: member-ordering
  teacherForm: FormGroup;
  constructor(private teacherService: TeachersService) {
    this.teacherForm = this.createFormGroup();
  }

  ngOnInit() {
  }

  onResetForm() {
    this.teacherForm.reset();
  }

  public onSaveForm() {
    this.teacherService.saveTeacher(this.teacherForm.value);
  }

}
