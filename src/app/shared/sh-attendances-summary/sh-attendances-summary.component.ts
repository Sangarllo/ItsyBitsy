import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild, Input, AfterViewInit, Output, EventEmitter, OnChanges} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Attendance, Status } from '@models/attendance.model';
import { AttendancesService } from '@services/attendances.service';
import { DatesService } from '@services/dates.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { UserDetails } from '@models/user.model';
import { Observable, combineLatest, BehaviorSubject } from 'rxjs';
import { map, finalize, tap } from 'rxjs/operators';
import { UserService } from '@services/user.service';
import { Rate } from '@models/rate';
import { RateService } from '@services/rates.service';
import { ReceiptData } from '@models/report-summary';
import { ScriptService } from '@services/script.service';

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

  columnsToDisplay = [ 'select',
    'studentImage', 'studentName',
    'rate', 'numAsistencias', 'paymentAmmout', 'paymentMethod',
    'actions2' ];

  public loading = true;

  dataSource = new MatTableDataSource();
  selection = new SelectionModel<UserDetails>(true, []);
  numStudentsWithAttendances = 0;

  constructor(
    private router: Router,
    private userSvc: UserService,
    private rateSvc: RateService,
    private attendancesSvc: AttendancesService,
    private datesSvc: DatesService,
    private scriptSvc: ScriptService,
  ) {
    this.students$ = this.userSvc.getAllStudents();
    this.rates$ = this.rateSvc.getAllRates();

    this.scriptSvc.load('pdfMake', 'vfsFonts');
  }

  ngOnInit() {
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

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.numStudentsWithAttendances = 0;

    if ( this.isAllSelected() ) {
      this.selection.clear();
    } else {
      this.dataSource.data.forEach((student: UserDetails) => {
        this.selection.select(student);
        if ( student.numAttendances === 0 ) {
          this.numStudentsWithAttendances++;
        }
      });
    }
  }

  changeSelection(student: UserDetails) {

    this.selection.toggle(student);

    if ( student.numAttendances === 0 ) {
      if ( this.selection.isSelected(student) ) {
        this.numStudentsWithAttendances++;
      } else {
        this.numStudentsWithAttendances--;
      }
    }
  }

  private displaySummary() {

    this.loading = true;

    const dateIni = this.date;
    const dateEnd = ( this.date.getMonth() === 12 ) ?
        new Date(this.date.getFullYear() + 1, 1, 1 ) :
        new Date(this.date.getFullYear(), this.date.getMonth() + 1, 1 );

    this.attendances$ = this.attendancesSvc.getAllAttendancesByDates( this.userDetails, dateIni, dateEnd);

    combineLatest([
      this.students$,
      this.attendances$,
      this.rates$,
    ])
      .pipe(
        map(([students, attendances, rates]) => students.map(student => ({
          ...student,
          rate: rates.find(rate => student.rateId === rate.id),
          // tslint:disable-next-line: max-line-length
          numAttendances: attendances.filter( attendance => attendance.studentId === student.uid && attendance.status === Status.Presente ).length,
          numExpectedAttendances: attendances.filter( attendance => attendance.studentId === student.uid ).length,
          paymentAmmout: this.rateSvc.calculatePayment(
            rates.find(rate => student.rateId === rate.id),
            attendances.filter( attendance => attendance.studentId === student.uid && attendance.status === Status.Presente ).length
          )
        }) as UserDetails)),
        // tap(data => console.log('student:  ', JSON.stringify(data))),
    )
    .subscribe({
      next: (students: UserDetails[]) => {
        this.dataSource.data = students;
        this.loading = false;
        },
      error: (err) => {
        console.log(`Oops... ${err}`);
        this.loading = false;
      },
      complete: () => {
        console.log(`Complete!`);
        this.loading = false;
      },
    });
  }


  withAttendances() {
    this.selection.selected.forEach(
      (student: UserDetails) => {
        if ( student.numAttendances === 0 ) {
          this.selection.deselect(student);
        }
      });

    this.numStudentsWithAttendances = 0;
  }


  // Download PDF with recipts info
  downloadInfo(student: UserDetails) {
    this.scriptSvc.downloadReceiptReport([
        this.getReceiptData(student)
      ],
      `Recibo del estudiante ${student.displayName}.pdf`
    );
  }

  // Download PDF with recipts info
  downloadAllInfo() {

    const receipts: ReceiptData[] = [];
    this.selection.selected.forEach(
      (student: UserDetails) => {
        receipts.push(this.getReceiptData(student));
      });

    this.scriptSvc.downloadReceiptReport(
      receipts,
      `Recibos de todos los estudiantes.pdf`
    );
  }


  // Open new window with report
  openInfo(student: UserDetails) {
    this.scriptSvc.openInfo([
      this.getReceiptData(student)
    ]);
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
