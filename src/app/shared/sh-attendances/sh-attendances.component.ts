import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild, Input, AfterViewInit, Output, EventEmitter, OnChanges} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Attendance, Status } from '../../models/attendance.model';
import { AttendancesService } from '../../services/attendances.service';
import { DatesService } from '../../services/dates.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { Course } from '../../models/course.model';
import { UserDetails } from 'src/app/models/user.model';
import { Observable, combineLatest } from 'rxjs';
import { CoursesService } from '../../services/courses.service';
import { map } from 'rxjs/operators';
import { UserService } from '../../services/user.service';

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

  columnsToDisplay = [ 'status', 'studentImage', 'studentName', 'courseImage', 'courseName', 'lessonDate' ]; // , 'actions'

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
  ) {
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

  private displayAttendances() {
    const dateIni = this.date;
    const dateEnd = ( this.date.getMonth() === 12 ) ?
        new Date(this.date.getFullYear() + 1, 1, 1 ) :
        new Date(this.date.getFullYear(), this.date.getMonth() + 1, 1 );

    console.log(`displayAttendances dateIni: ${dateIni}`);
    console.log(`displayAttendances dateEnd: ${dateEnd}`);
    console.log(`displayAttendances userdet: ${this.userDetails}`);

    this.courses$ = this.coursesSvc.getAllCourses();
    this.students$ = this.userSvc.getAllStudents();
    this.attendances$ = ( this.userDetails ) ?
      this.attendancesSvc.getAllAttendancesByUser( this.userDetails, dateIni, dateEnd) :
      this.attendancesSvc.getAllAttendancesByMonth( dateIni, dateEnd);

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
        courseImage: courses.find(c => attendance.courseId === c.id)?.image,
      }) as Attendance)))
    .subscribe((attendances: Attendance[]) => {
      this.dataSource.data = attendances;
    });
  }

}
