import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild, Input} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { UserDetails } from '../../models/user.model';
import { Attendance, Status } from '../../models/attendance.model';
import { AttendancesService } from '../../services/attendances.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'sh-user-attendance-table',
  templateUrl: './sh-user-attendance-table.component.html',
  styleUrls: ['./sh-user-attendance-table.component.scss']
})
export class ShUserAttendanceTableComponent implements OnInit {

  columnsToDisplay = [ 'status', 'schedule', 'actions'];
  dataSource: MatTableDataSource<Attendance>;
  selection = new SelectionModel<Attendance>(true, []);
  statusAttendance: Status[];
  statusToApply = Attendance.getDefaultStatus();
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @Input() student: UserDetails;
  attendances: Attendance[] = [];

  constructor(
    private attendancesSvc: AttendancesService,
    private router: Router,
  ) { }


  ngOnInit() {
    this.statusAttendance = Attendance.getAllStatus();
    this.dataSource = new MatTableDataSource(this.attendances);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    this.attendancesSvc.getAllAttendancesByUser(this.student)
    .subscribe((attendances: Attendance[]) => {
      this.attendances = attendances;
      this.dataSource = new MatTableDataSource(this.attendances);
    });
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
