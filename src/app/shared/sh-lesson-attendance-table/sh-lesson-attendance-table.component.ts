import { Component, OnInit, ViewChild, Input} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { UserDetails } from '../../models/user.model';
import { Course } from '../../models/course.model';
import { Attendance } from '../../models/attendance.model';
import { Lesson } from '../../models/lesson.model';


@Component({
  selector: 'sh-lesson-attendance-table',
  templateUrl: './sh-lesson-attendance-table.component.html',
  styleUrls: ['./sh-lesson-attendance-table.component.scss']
})
export class ShLessonAttendanceTableComponent implements OnInit {

  columnsToDisplay = ['studentName', 'status'];
  dataSource: MatTableDataSource<Attendance>;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @Input() lesson: Lesson;

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
    this.dataSource = new MatTableDataSource(this.lesson.attendanceList);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  gotoNew() { // TODO! Es diferente
    this.router.navigate([`/${Course.PATH_URL}/${this.lesson.id}/${UserDetails.PATH_URL}/0/editar`]);
  }

  onRowClicked(user) {
    this.router.navigate([`/${UserDetails.PATH_URL}/${user.uid}`]);
  }
}
