import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild, Input, AfterViewInit, Output, EventEmitter} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Attendance, Status } from '../../models/attendance.model';
import { AttendancesService } from '../../services/attendances.service';
import { DatesService } from '../../services/dates.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { Course } from '../../models/course.model';

@Component({
  selector: 'sh-month-attendance-table',
  templateUrl: './sh-month-attendance-table.component.html',
  styleUrls: ['./sh-month-attendance-table.component.scss']
})
export class ShMonthAttendanceTableComponent implements OnInit, AfterViewInit {

  @Output() reportSummary = new EventEmitter<Attendance[]>();
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
    private router: Router,
    private dateSvc: DatesService,
    private attendancesSvc: AttendancesService,
  ) { }


  ngOnInit() {
    this.statusAttendance = Attendance.getAllStatus();

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
      this.reportSummary.emit(this.attendances);
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

  gotoLesson(attendance: Attendance) {
    const courseId = attendance.courseId;
    const lessonId = attendance.lessonId;
    this.router.navigate([`/${Course.PATH_URL}/${courseId}/lessons/${lessonId}`]);
  }


}
