import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild, Input, AfterViewInit, Output, EventEmitter} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { UserDetails } from '../../models/user.model';
import { Attendance, Status } from '../../models/attendance.model';
import { AttendancesService } from '../../services/attendances.service';
import Swal from 'sweetalert2';
import { DatesService } from '../../services/dates.service';
import { ReportSummary } from '../../models/report-summary';

@Component({
  selector: 'sh-user-attendance-table',
  templateUrl: './sh-user-attendance-table.component.html',
  styleUrls: ['./sh-user-attendance-table.component.scss']
})
export class ShUserAttendanceTableComponent implements OnInit, AfterViewInit {

  @Output() reportSummary = new EventEmitter<ReportSummary>();
  columnsToDisplay = [ 'status', 'courseName', 'lessonDate', 'actions'];
  dataSource = new MatTableDataSource();
  selection = new SelectionModel<Attendance>(true, []);
  statusAttendance: Status[];
  statusToApply = Attendance.getDefaultStatus();
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @Input() dateIni: Date;
  @Input() dateEnd: Date;
  @Input() student: UserDetails;
  attendances: Attendance[] = [];

  constructor(
    private dateSvc: DatesService,
    private attendancesSvc: AttendancesService,
    private router: Router,
  ) { }


  ngOnInit() {

    this.statusAttendance = Attendance.getAllStatus();
    this.dataSource = new MatTableDataSource(this.attendances);

    this.attendancesSvc.getAllAttendancesByUser(this.student, this.dateIni, this.dateEnd)
    .subscribe((attendances: Attendance[]) => {
      this.attendances = attendances;

      const coursesNames: string[] = [];
      let nAttendances = 0;
      let nAttendancesConfirmed = 0;
      this.attendances.forEach((attendance: Attendance) => {
        attendance.lessonDate = this.dateSvc.fromFirebaseDate(attendance.lessonDate);

        nAttendances = nAttendances + 1;
        if ( !coursesNames.includes(attendance.courseName) ) {
          coursesNames.push(attendance.courseName);
        }

        if ( attendance.status === Status.Presente ) {
          nAttendancesConfirmed++;
        }
      });

      this.dataSource.data = this.attendances;

      const dataReportSummary: ReportSummary = {
        info: '',
        // tslint:disable-next-line:object-literal-shorthand
        nAttendances: nAttendances,
        // tslint:disable-next-line:object-literal-shorthand
        nAttendancesConfirmed: nAttendancesConfirmed,
        courses: coursesNames,
      };
      this.reportSummary.emit(dataReportSummary);
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
