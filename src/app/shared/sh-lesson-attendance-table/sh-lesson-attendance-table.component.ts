import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild, Input, AfterViewInit} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { UserDetails } from '../../models/user.model';
import { Attendance, Status } from '../../models/attendance.model';
import { Lesson } from '../../models/lesson.model';
import { AttendancesService } from '../../services/attendances.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'sh-lesson-attendance-table',
  templateUrl: './sh-lesson-attendance-table.component.html',
  styleUrls: ['./sh-lesson-attendance-table.component.scss']
})
export class ShLessonAttendanceTableComponent implements OnInit, AfterViewInit {

  columnsToDisplay = [ 'select', 'status', 'studentName', 'actions'];
  dataSource = new MatTableDataSource();
  selection = new SelectionModel<Attendance>(true, []);
  statusAttendance: Status[];
  statusToApply = Attendance.getDefaultStatus();
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @Input() lesson: Lesson;
  attendances: Attendance[] = [];

  constructor(
    private attendancesSvc: AttendancesService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.statusAttendance = Attendance.getAllStatus();
    this.dataSource = new MatTableDataSource(this.attendances);

    this.attendancesSvc.getAllAttendancesByLesson(this.lesson)
    .subscribe((attendances: Attendance[]) => {
      this.attendances = attendances;
      console.log(`Num Attendances: ${this.attendances.length}`);
      this.dataSource.data = this.attendances;
    });
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
        this.dataSource.data.forEach((row: Attendance) => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: Attendance): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.studentId + 1}`; // TODO: Undestand!
  }

  applyStatus() {

    if ( this.selection.selected.length > 0 ) {

      const newStatus = this.statusToApply;
      this.selection.selected.forEach(attendance => {
        attendance.status = Attendance.toStatus(newStatus);
        this.attendancesSvc.updateAttendance(this.lesson, attendance)
          .subscribe((updAttendance: Attendance) => {
            console.log(`Modificada: ${JSON.stringify(updAttendance)}`);
          });
      });

      Swal.fire({
        icon: 'success',
        title: 'Actualización realizada',
        text: `Se han ${newStatus} un total de ${this.selection.selected.length} asistencias`,
        // footer: '<a href>Why do I have this issue?</a>'
      });
    } else {
      Swal.fire('No has seleccionado asistencias para actualizar');
    }
  }

  onRowClicked(user) {
    this.router.navigate([`/${UserDetails.PATH_URL}/${user.uid}`]);
  }

  addComment(attendance) {
    Swal.fire({
      title: 'Añade un comentario',
      input: 'text',
      inputAttributes: {
        autocapitalize: 'off'
      },
      showCancelButton: true,
      confirmButtonText: 'Aceptar',
      showLoaderOnConfirm: true,
      preConfirm: (commentAdded) => {
        attendance.comment = commentAdded;
        this.attendancesSvc.updateAttendance(this.lesson, attendance)
          .subscribe((updAttendance: Attendance) => {
            console.log(`Asistencia modificada: ${JSON.stringify(updAttendance)}`);
          });
      },
      allowOutsideClick: () => !Swal.isLoading()
    });
  }

  viewComment(attendance) {
    Swal.fire({
      title: `Nota sobre ${attendance.studentName}:`,
      text: `${attendance.comment}`,
      showClass: {
        popup: 'animated fadeInDown faster'
      },
      hideClass: {
        popup: 'animated fadeOutUp faster'
      }
    });
  }
}
