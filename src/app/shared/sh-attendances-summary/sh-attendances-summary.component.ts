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
import { UserDetails } from 'src/app/models/user.model';
import { Observable, combineLatest } from 'rxjs';
import { CoursesService } from '../../services/courses.service';
import { map } from 'rxjs/operators';
import { UserService } from '../../services/user.service';
import { PaymentMethod } from '../../models/user.model';
import { Rate } from '../../models/rate';
import { RateService } from '../../services/rates.service';
import { ReceiptData } from '../../models/report-summary';
import { ScriptService } from '../../services/script.service';

declare let pdfMake: any ;

@Component({
  selector: 'app-sh-attendances-summary',
  templateUrl: './sh-attendances-summary.component.html',
  styleUrls: ['./sh-attendances-summary.component.scss']
})
export class ShAttendancesSummaryComponent implements OnInit, AfterViewInit, OnChanges {

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  @Input() userDetails: UserDetails;
  @Input() date: Date;
  @Output() reportSummary = new EventEmitter<Attendance[]>();

  students$: Observable<UserDetails[]>;
  attendances$: Observable<Attendance[]>;
  rates$: Observable<Rate[]>;

  columnsToDisplay = [ 'studentImage', 'studentName', 'rate',
  'numAsistencias', 'paymentAmmout', 'paymentMethod',
  'actions' ];

  dataSource = new MatTableDataSource();
  selection = new SelectionModel<Attendance>(true, []);
  statusAttendance: Status[];
  statusToApply = Attendance.getDefaultStatus();

  constructor(
    private router: Router,
    private userSvc: UserService,
    private rateSvc: RateService,
    private attendancesSvc: AttendancesService,
    private datesSvc: DatesService,
    private coursesSvc: CoursesService,
    private scriptSvc: ScriptService,
  ) {
    this.students$ = this.userSvc.getAllStudents();
    this.rates$ = this.rateSvc.getAllRates();

    this.scriptSvc.load('pdfMake', 'vfsFonts');
  }

  ngOnInit() {
    this.statusAttendance = Attendance.getAllStatus();
    this.displaySummary();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnChanges(): void {
    this.displaySummary();
  }

  gotoStudent(student: UserDetails) {
    this.router.navigate([`/${UserDetails.PATH_URL}/${student.uid}`]);
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  private displaySummary() {
    const dateIni = this.date;
    const dateEnd = ( this.date.getMonth() === 12 ) ?
        new Date(this.date.getFullYear() + 1, 1, 1 ) :
        new Date(this.date.getFullYear(), this.date.getMonth() + 1, 1 );

    this.attendances$ = ( this.userDetails ) ?
      this.attendancesSvc.getAllAttendancesByUser( this.userDetails, dateIni, dateEnd) :
      this.attendancesSvc.getAllAttendancesByDates( dateIni, dateEnd);

    combineLatest([
      this.students$,
      this.attendances$,
      this.rates$,
    ])
      .pipe(map(([students, attendances, rates]) => students.map(student => ({
        ...student,
        rate: rates.find(rate => student.rateId === rate.id),
        numAttendances: attendances.filter( attendance => attendance.studentId === student.uid ).length,
        paymentAmmout: this.rateSvc.calculatePayment(
          rates.find(rate => student.rateId === rate.id),
          attendances.filter( attendance => attendance.studentId === student.uid ).length
        )
      }) as UserDetails)))
    .subscribe((students: UserDetails[]) => {
      this.dataSource.data = students;
    });
  }

  downloadInfo(student: UserDetails) {
    const receipts: ReceiptData[] = [
      this.getReceiptData(student)
    ];

    const documentDefinition = this.scriptSvc.createReports(receipts, 3);
    const reportName = `Recibo ${student.displayName}.pdf`;
    pdfMake.createPdf(documentDefinition).download(reportName);
  }


  // Open new window with report
  openInfo(student: UserDetails) {
    const receipts: ReceiptData[] = [
      this.getReceiptData(student)
    ];

    const documentDefinition = this.scriptSvc.createReports(receipts, 3);
    pdfMake.createPdf(documentDefinition).open();
  }

  private getReceiptData(student: UserDetails): ReceiptData {

    const studentName: string = student.displayName;
    const paymentAmmout: string = `${student.paymentAmmout}`;
    const month = this.datesSvc.MONTH_NAMES[this.date.getMonth()];
    const year = this.date.getFullYear().toString();

    return {
      studentName,
      paymentAmmout,
      month,
      year
    };
  }

}
