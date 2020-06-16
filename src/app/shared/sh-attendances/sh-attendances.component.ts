import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild, Input, AfterViewInit, Output, EventEmitter, OnChanges} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { Observable, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';

import { UserService } from '@services/user.service';
import { CoursesService } from '@services/courses.service';
import { AttendancesService } from '@services/attendances.service';
import { DatesService } from '@services/dates.service';
import { Course } from '@models/course.model';
import { Attendance, Status } from '@models/attendance.model';
import { UserDetails } from '@models/user.model';
import { AttendanceData } from '@app/models/report-summary';
import { ScriptService } from '@services/script.service';
import { ReportsService } from '@services/reports.service';
import moment from 'moment';

@Component({
  selector: 'app-sh-attendances',
  templateUrl: './sh-attendances.component.html',
  styleUrls: ['./sh-attendances.component.scss']
})
export class ShAttendancesComponent implements OnInit, AfterViewInit, OnChanges {

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  @Input() userDetails: UserDetails;
  @Input() date: Date;
  @Output() reportSummary = new EventEmitter<Attendance[]>();

  students$: Observable<UserDetails[]>;
  courses$: Observable<Course[]>;
  attendances$: Observable<Attendance[]>;

  // For reporting
  attendances: Attendance[];
  month: string = '';

  columnsToDisplay = [ 'status', 'studentImage', 'studentName', 'courseImage', 'courseName', 'lessonDate', 'actions' ];

  public loading = true;
  dataSource = new MatTableDataSource();
  selection = new SelectionModel<Attendance>(true, []);
  statusAttendance: Status[];
  statusToApply = Attendance.getDefaultStatus();

  constructor(
    private router: Router,
    private dateSvc: DatesService,
    private userSvc: UserService,
    private attendancesSvc: AttendancesService,
    private coursesSvc: CoursesService,
    private scriptSvc: ScriptService,
    private reportSvc: ReportsService
  ) {
    moment.locale('es');
    this.month = moment(this.date).format('MMMM [de] YYYY');
    this.loading = true;
  }

  ngOnInit() {
    this.statusAttendance = Attendance.getAllStatus();
    this.displayAttendances();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnChanges(): void {
    this.loading = true;
    this.displayAttendances();
  }

  gotoStudent(attendance: Attendance) {
    this.router.navigate([`/${UserDetails.PATH_URL}/${attendance.studentId}`]);
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  viewComment(attendance) {
    Swal.fire({
      title: `<h4>Nota sobre ${attendance.studentName}:</h4>`,
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

  private displayAttendances() {
    const dateIni = this.date;
    const dateEnd = ( this.date.getMonth() === 12 ) ?
        new Date(this.date.getFullYear() + 1, 1, 1 ) :
        new Date(this.date.getFullYear(), this.date.getMonth() + 1, 1 );

    this.month = moment(this.date).format('MMMM [de] YYYY');

    this.courses$ = this.coursesSvc.getAllCourses();
    this.students$ = this.userSvc.getAllStudents();
    this.attendances$ = this.attendancesSvc.getAllAttendancesByDates( this.userDetails, dateIni, dateEnd );

    combineLatest([
      this.attendances$,
      this.courses$,
      this.students$
    ])
      .pipe(map(([attendances, courses, students]) => attendances.map(attendance => ({
        ...attendance,
        lessonDate: this.dateSvc.fromFirebaseDate(attendance.lessonDate),
        studentName: students.find(st => attendance.studentId === st.uid)?.displayName,
        studentImage: students.find(st => attendance.studentId === st.uid)?.photoURL,
        courseName: courses.find(c => attendance.courseId === c.id)?.name,
        courseImage: courses.find(c => attendance.courseId === c.id)?.image
      }) as Attendance)))
    .subscribe((attendances: Attendance[]) => {
      this.attendances = attendances;
      this.dataSource.data = this.attendances;
      this.loading = false;
    });
  }

  // Download PDF with attedances info
  downloadReport() {

    let reportTitle: string;
    if ( this.userDetails ) {
      reportTitle = `Listado de Asistencias de ${this.userDetails.displayName} de ${this.month}`;
    } else {
      reportTitle = `Listado de Asistencias de ${this.month}`;
    }

    const data = this.reportSvc.getAttendancesReportData(
      this.attendances
    );

    this.scriptSvc.downloadAttendancesReports(
        `${reportTitle}.pdf`,
        reportTitle,
        data,
    );
  }
}
