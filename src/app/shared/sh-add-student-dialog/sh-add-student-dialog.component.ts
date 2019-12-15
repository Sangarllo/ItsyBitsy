import {Component, OnInit, Inject} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { UserDetails } from '../../models/user.model';
import { UserService } from '../../services/user.service';
import { Course } from '../../models/course.model';

@Component({
  selector: 'app-sh-add-student-dialog',
  templateUrl: './sh-add-student-dialog.component.html',
  styleUrls: ['./sh-add-student-dialog.component.scss']
})
export class ShAddStudentDialogComponent implements OnInit {

  selectedStudent: UserDetails;
  STUDENTS: UserDetails[];

  constructor(
    public dialogRef: MatDialogRef<ShAddStudentDialogComponent>,
    private userService: UserService,
    @Inject(MAT_DIALOG_DATA) public data: Course) {}

    ngOnInit() {
      this.userService.getAllStudents()
      .subscribe((students: UserDetails[]) => {
        this.STUDENTS = students;
      });
    }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
