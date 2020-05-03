import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { UserDetails } from '@models/user.model';
import { UserService } from '@services/user.service';


@Component({
  selector: 'sh-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.scss']
})
export class AddStudentComponent implements OnInit {

  @Output() selectStudent = new EventEmitter<UserDetails>();
  selectedStudent: UserDetails;
  STUDENTS: UserDetails[];

  constructor(
    private userService: UserService,
  ) { }

  ngOnInit() {
    this.userService.getAllStudents()
    .subscribe((students: UserDetails[]) => {
      this.STUDENTS = students;
    });
  }

  onClick() {
    this.selectStudent.emit(this.selectedStudent);
  }

}
