import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild, Input} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { UserDetails } from '../../models/user.model';
import { Course } from '../../models/course.model';
import { Attendance, Status } from '../../models/attendance.model';
import { Lesson } from '../../models/lesson.model';
import { AttendancesService } from '../../services/attendances.service';


@Component({
  selector: 'sh-lesson-attendance-table',
  templateUrl: './sh-lesson-attendance-table.component.html',
  styleUrls: ['./sh-lesson-attendance-table.component.scss']
})
export class ShLessonAttendanceTableComponent implements OnInit {

  columnsToDisplay = ['id', 'select', 'studentName', 'status'];
  dataSource: MatTableDataSource<Attendance>;
  selection = new SelectionModel<Attendance>(true, []);
  statusAttendance: Status[];
  statusToApply = Attendance.getDefaultStatus();
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @Input() lesson: Lesson;

  constructor(
    private router: Router,
    private attendancesSvc: AttendancesService
  ) { }

  ngOnInit() {
    this.dataSource = new MatTableDataSource(this.lesson.attendanceList);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    this.statusAttendance = Attendance.getAllStatus();
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: Attendance): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.studentId + 1}`; // TODO: Undestand!
  }

  gotoApply() {

    if ( this.selection.selected.length > 0 ) {

      const newStatus = this.statusToApply;
      console.log(`Aplicar ${this.statusToApply} a las ${this.selection.selected.length} asistencias seleccionadas`);

      this.selection.selected.forEach(attendance => {
        attendance.status = Attendance.toStatus(newStatus);
        console.log(`Actualizando: ${JSON.stringify(attendance)} a ${attendance.status}`);
        this.attendancesSvc.updateAttendance(this.lesson, attendance)
          .subscribe((updAttendance: Attendance) => {
            console.log(`Modificada: ${JSON.stringify(updAttendance)}`);
          });
      });

    } else {
      console.log(`No hay asistencias que actualizar`);
    }

    // console.log(`Selection: ${JSON.stringify(this.selection)}`);
  }

  onRowClicked(user) {
    this.router.navigate([`/${UserDetails.PATH_URL}/${user.uid}`]);
  }
}
