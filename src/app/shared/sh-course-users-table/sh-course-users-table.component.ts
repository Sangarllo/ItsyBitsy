import { Component, OnInit, ViewChild, Input, AfterViewInit} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { UserDetails } from '../../models/user.model';
import { Course } from '../../models/course.model';
import { Student } from 'src/app/models/student.model';

@Component({
  selector: 'sh-course-users-table',
  templateUrl: './sh-course-users-table.component.html',
  styleUrls: ['./sh-course-users-table.component.scss']
})
export class ShCourseUsersTableComponent implements OnInit, AfterViewInit {

  columnsToDisplay = ['photoURL', 'displayName', 'email'];
  dataSource = new MatTableDataSource();
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @Input() course: Course;

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
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

  onRowClicked(user) {
    this.router.navigate([`/${UserDetails.PATH_URL}/${user.uid}`]);
  }
}
