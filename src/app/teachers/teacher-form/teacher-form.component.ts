import { Component } from '@angular/core';
import { TeachersService } from '../../services/teachers.service';
import { FormControl, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-teacher-form',
  templateUrl: './teacher-form.component.html',
  styleUrls: ['./teacher-form.component.scss']
})
export class TeacherFormComponent {

  createFormGroup() {
    return new FormGroup({
      name: new FormControl(''),
      surname: new FormControl(''),
    });
  }

  // tslint:disable-next-line: member-ordering
  teacherForm: FormGroup;
  constructor(private teachersService: TeachersService) {
    this.teacherForm = this.createFormGroup();
  }

  onResetForm() {
    this.teacherForm.reset();
  }

  public onSaveForm() {
    this.teachersService.saveTeacher(this.teacherForm.value);
  }

}
