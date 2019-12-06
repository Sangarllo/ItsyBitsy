import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild, Input, AfterViewInit, Output, EventEmitter} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Attendance, Status } from '../../models/attendance.model';
import { AttendancesService } from '../../services/attendances.service';
import { DatesService } from '../../services/dates.service';
import { ReportSummary } from '../../models/report-summary';
import Swal from 'sweetalert2';

@Component({
  selector: 'sh-month-attendance-table',
  templateUrl: './sh-month-attendance-table.component.html',
  styleUrls: ['./sh-month-attendance-table.component.scss']
})
export class ShMonthAttendanceTableComponent implements OnInit, AfterViewInit {

  @Output() reportSummary = new EventEmitter<ReportSummary>();
  columnsToDisplay = [ 'status', 'studentName', 'courseName', 'lessonDate', 'actions'];
  dataSource = new MatTableDataSource();
  selection = new SelectionModel<Attendance>(true, []);
  statusAttendance: Status[];
  statusToApply = Attendance.getDefaultStatus();
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @Input() dateIni: Date;
  @Input() dateEnd: Date;
  attendances: Attendance[] = [];

  constructor(
    private dateSvc: DatesService,
    private attendancesSvc: AttendancesService,
  ) { }


  ngOnInit() {

    console.log(`dateIni: ${this.dateIni}`);
    console.log(`dateEnd: ${this.dateEnd}`);

    this.statusAttendance = Attendance.getAllStatus();
    this.dataSource = new MatTableDataSource(this.attendances);

    this.attendancesSvc.getAllAttendancesByMonth( this.dateIni, this.dateEnd)
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

        if ( attendance.status === Status.Confirmada ) {
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
