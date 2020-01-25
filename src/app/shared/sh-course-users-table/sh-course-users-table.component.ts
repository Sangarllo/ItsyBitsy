import { Component, OnInit, ViewChild, Input, AfterViewInit} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { UserDetails } from '../../models/user.model';
import { Course } from '../../models/course.model';
import { Student } from 'src/app/models/student.model';
import {MatDialog} from '@angular/material/dialog';
import { ShAddStudentDialogComponent } from '../sh-add-student-dialog/sh-add-student-dialog.component';
import { CoursesService } from '../../services/courses.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'sh-course-users-table',
  templateUrl: './sh-course-users-table.component.html',
  styleUrls: ['./sh-course-users-table.component.scss']
})
export class ShCourseUsersTableComponent implements OnInit, AfterViewInit {

  columnsToDisplay = ['photoURL', 'displayName', 'actions'];
  dataSource = new MatTableDataSource();
  newStudent: UserDetails;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @Input() course: Course;

  constructor(
    public dialog: MatDialog,
    private courseSvc: CoursesService,
    private router: Router
  ) { }

  ngOnInit() {
    this.sortStudentList();
    this.dataSource.data = this.course.studentList;
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  gotoNew() {
    this.router.navigate([`/${Course.PATH_URL}/${this.course.id}/${Student.PATH_URL}`]); // /0/editar
  }

  removeStudent(removedStudent: UserDetails) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: `Si pulsas OK, ${removedStudent.displayName} dejará de ser estudiante del curso`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: `OK`
    }).then((result) => {
      if (result.value) {

        this.course.studentList = this.course.studentList.filter(student => student.uid !== removedStudent.uid );

        this.courseSvc.updateCourse(this.course)
        .subscribe( (course: Course) => {
          this.course = course;
          this.sortStudentList();
          this.dataSource.data = this.course.studentList;
        });
      }
    });
  }

  openDialogToAddStudent(): void {

      const dialogRef = this.dialog.open(ShAddStudentDialogComponent, {
        width: '500px',
        data: {  course: this.course }
      });

      dialogRef.afterClosed().subscribe(student => {
        console.log('The dialog was closed');
        if ( student ) {
          this.newStudent = student;
          console.log(`new student: ${JSON.stringify(this.newStudent)}`);

          if (!this.isInArray(this.newStudent)) {
            this.course.studentList.push(this.newStudent);
            this.courseSvc.updateCourse(this.course)
              .subscribe( (course: Course) => {
                this.course = course;
                this.sortStudentList();
                this.dataSource.data = this.course.studentList;
              });
          } else {
            Swal.fire({
              text: 'Este estudiante ya asistía al curso',
              icon: 'warning',
            });
          }
        }
      });
  }

  private isInArray(userDetails: UserDetails): boolean {
    let isInArray: boolean = false;
    this.course.studentList.forEach(student => {
      console.log(`comparing: ${student.uid} === ${userDetails.uid}`);
      if ( student.uid === userDetails.uid ) {
        isInArray = true;
      }
    });
    return isInArray;
  }

  private sortStudentList() {
    // tslint:disable-next-line:max-line-length
    this.course.studentList.sort((a, b) => (a.displayName > b.displayName) ? 1 : (a.displayName === b.displayName) ? ((a.displayName > b.displayName) ? 1 : -1) : -1 );
  }
}
