import {Component, OnInit, Inject} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { UserDetails } from '../../models/user.model';
import { UserService } from '../../services/user.service';
import { Course } from '../../models/course.model';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { UserDetails } from 'src/app/models/user.model';

@Component({
  selector: 'app-sh-add-student-dialog',
  templateUrl: './sh-add-student-dialog.component.html',
  styleUrls: ['./sh-add-student-dialog.component.scss']
})
export class ShAddStudentDialogComponent implements OnInit {

  STUDENTS: UserDetails[];
  filteredStudents$: Observable<UserDetails[]>;
  studentCtrl = new FormControl();
  selectedStudent: UserDetails;

  constructor(
    public dialogRef: MatDialogRef<ShAddStudentDialogComponent>,
    private fb: FormBuilder,
    private userService: UserService,
    @Inject(MAT_DIALOG_DATA) public data: Course) {
    }

    ngOnInit() {

      this.userService.getAllStudents()
      .subscribe((students: UserDetails[]) => {
        this.STUDENTS = students;
        this.filteredStudents$ = this.studentCtrl.valueChanges
        .pipe(
          startWith(''),
          map(student => student ? this._filterStudents(student) : this.STUDENTS.slice())
        );
      });
    }

  onNoClick(): void {
    this.dialogRef.close();
  }

  private _filterStudents(value: string): UserDetails[] {
    const filterValue = value.toLowerCase();
    return this.STUDENTS.filter(student => student.displayName.toLowerCase().includes(filterValue));
  }

  onSelectionChange(event){
    const displayNameSelected = event.option.value;
    const arrayFiltered = this.STUDENTS.filter( x => x.displayName === displayNameSelected);
    this.selectedStudent = arrayFiltered[0];
  }
}
