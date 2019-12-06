import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild, Input, AfterViewInit, Output, EventEmitter} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Attendance, Status } from '../../models/attendance.model';
import { AttendancesService } from '../../services/attendances.service';
import { DatesService } from '../../services/dates.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'sh-month-attendance-table-summary',
  templateUrl: './sh-month-attendance-table-summary.component.html',
  styleUrls: ['./sh-month-attendance-table-summary.component.scss']
})
export class ShMonthAttendanceTableSummaryComponent implements OnInit, AfterViewInit {

  columnsToDisplay = ['photoURL', 'displayName', 'studentId', 'numAsistencias'];
  dataSource = new MatTableDataSource();
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @Input() attendances: Attendance[];

  studentsIds: string[] = [];
  studentsArray = [];

  constructor(
    private dateSvc: DatesService,
    private attendancesSvc: AttendancesService,
  ) { }


  ngOnInit() {

    // Listamos los usuarios diferentes
    this.attendances.forEach((attendance: Attendance) => {
        const studentId = attendance.studentId;

        const indStudent = this.studentsIds.indexOf(studentId);
        if ( indStudent < 0 ) {
          // TODO: habría que buscar la tarifa
          this.studentsIds.push(studentId);
          const data = {
            studentId: attendance.studentId,
            photoURL: attendance.studentImage,
            displayName: attendance.studentName,
            numAsistencias: 1 // TODO: Tendrán que ser confirmadas
          };
          this.studentsArray.push(data);
        } else {
          const data = {
            studentId: attendance.studentId,
            photoURL: attendance.studentImage,
            displayName: attendance.studentName,
            numAsistencias: this.studentsArray[indStudent].numAsistencias + 1
          };
        }
      });

    // Los asociamos a la MatTable
    this.dataSource.data = this.studentsArray;
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
