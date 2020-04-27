import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild, Input, AfterViewInit, Output, EventEmitter} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Attendance, Status } from '../../models/attendance.model';
import { AttendancesService } from '../../services/attendances.service';
import { DatesService } from '../../services/dates.service';
import Swal from 'sweetalert2';
import { UserDetails } from 'src/app/models/user.model';
import { Rate } from '../../models/rate';
import { from } from 'rxjs';
import { User, PaymentMethod } from '../../models/user.model';
import { RateService } from '../../services/rates.service';

import { ScriptService } from '../../services/script.service';
import { ReceiptData } from '../../models/report-summary';
declare let pdfMake: any ;

@Component({
  selector: 'sh-month-attendance-table-summary',
  templateUrl: './sh-month-attendance-table-summary.component.html',
  styleUrls: ['./sh-month-attendance-table-summary.component.scss']
})
export class ShMonthAttendanceTableSummaryComponent implements OnInit, AfterViewInit {

  columnsToDisplay = ['studentImage', 'studentName', 'numAsistencias',
    'rateName', 'paymentAmmout', 'paymentMethod', 'actions'];
  dataSource = new MatTableDataSource();
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  @Input() attendances: Attendance[];
  @Input() users: User[];
  @Input() rates: Rate[];
  @Input() month: string;
  @Input() year: string;

  studentsIds: string[] = [];
  studentsArray: any[] = [];
  studentsMap = new Map();


  constructor(
    private scriptSvc: ScriptService,
    private rateSvc: RateService
  ) {
    console.log('Loading External Scripts');
    this.scriptSvc.load('pdfMake', 'vfsFonts');
  }

  ngOnInit() {

    // TODO: Mantengo lo de "programada" porque aún hay datos con ese valor,
    // en lugar de "prevista"

    // Listamos los usuarios diferentes
    this.attendances.forEach((attendance: Attendance) => {
        const studentId = attendance.studentId;

        let newData: any;
        if (this.studentsMap.has(studentId)) {

          const oldData = this.studentsMap.get(studentId);
          newData = {
            studentId: oldData.studentId,
            studentImage: oldData.studentImage,
            studentName: oldData.studentName,
            numAsistencias: oldData.numAsistencias + 1,
            numAsistenciasConfirmadas: ( attendance.status === 'presente' ) ?
              oldData.numAsistenciasConfirmadas + 1 : oldData.numAsistenciasConfirmadas,
            numAsistenciasProgramadas: ( (attendance.status === 'prevista') || (attendance.status === 'programada') ) ?
              oldData.numAsistenciasProgramadas + 1 : oldData.numAsistenciasProgramadas,
            numAsistenciasAnuladas: ( attendance.status === 'ausente' ) ?
              oldData.numAsistenciasAnuladas + 1 : oldData.numAsistenciasAnuladas,
          };
        } else {

          newData = {
            studentId: attendance.studentId,
            studentImage: attendance.studentImage,
            studentName: attendance.studentName,
            numAsistencias: 1,
            numAsistenciasConfirmadas: ( attendance.status === 'presente' ) ? 1 : 0,
            numAsistenciasProgramadas: ( (attendance.status === 'prevista') || (attendance.status === 'programada') ) ? 1 : 0,
            numAsistenciasAnuladas: ( attendance.status === 'ausente' ) ? 1 : 0,
          };
        }
        this.studentsMap.set(studentId, newData);
      });

    this.studentsArray = [];
    for (const [ studentId, value ] of this.studentsMap) {

      const dataRate = this.getRate(studentId);

      const data = {
        studentId: value.studentId,
        photoURL: value.studentImage,
        studentName: value.studentName,
        numAsistencias: value.numAsistencias,
        numAsistenciasConfirmadas: value.numAsistenciasConfirmadas,
        numAsistenciasProgramadas: value.numAsistenciasProgramadas,
        numAsistenciasAnuladas: value.numAsistenciasAnuladas,
        // rateId: rate.id,
        rateName: ( dataRate ) ? dataRate.rate.name : null,
        ratePrice: ( dataRate ) ? dataRate.rate.Price : null,
        paymentMethod: ( dataRate ) ? dataRate.paymentMethod : null,
        paymentAmmout: ( dataRate ) ? this.rateSvc.calculatePayment(dataRate.rate, value.numAsistenciasConfirmadas) : null
      };

      this.studentsArray.push(data);
    }

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

  getRate(studentId: string): any | null {
    let dataRate: any = null;

    this.users.forEach((user: UserDetails) => {
      if ( user.uid === studentId ) {

        if ( !user.rateId ) {
          return dataRate;
        }

        this.rates.forEach((rate: Rate) => {
          if ( rate.id === user.rateId ) {
            dataRate = {
              rate,
              paymentMethod: user.paymentMethod
            };
          }
        });
      }
    });

    return dataRate;
  }

  printInfo(studentItem: any) {
    // tslint:disable-next-line:no-string-literal
    const studentName: string = studentItem['studentName'];
    // tslint:disable-next-line:no-string-literal
    const paymentAmmout: string = studentItem['paymentAmmout'];

    const receiptData: ReceiptData = {
      studentName,
      paymentAmmout,
      month: this.month,
      year: this.year
    };

    const receipts: ReceiptData[] = [
      receiptData
    ];

    const documentDefinition = this.scriptSvc.createReports(receipts, 3);
    const reportName = `Recibo ${this.year}-${this.month} ${studentName}.pdf`;
    pdfMake.createPdf(documentDefinition).print();
  }

  downloadAllInfo(): any {
    const receipts: ReceiptData[] = [];
    this.studentsArray.forEach(student => {

      if ( ( student.paymentMethod ) && ( student.paymentMethod === 'Recibo' ) ) {
        const receiptData: ReceiptData = {
          studentName: student.studentName,
          paymentAmmout: student.paymentAmmout,
          month: this.month,
          year: this.year
        };

        receipts.push(receiptData);
      }
    });

    const documentDefinition = this.scriptSvc.createReports(receipts, 6);
    const reportName = `Recibo conjunto ${this.year}-${this.month}.pdf`;
    pdfMake.createPdf(documentDefinition).download(reportName);
  }

  downloadInfo(studentItem: any) {
    // tslint:disable-next-line:no-string-literal
    const studentName: string = studentItem['studentName'];
    // tslint:disable-next-line:no-string-literal
    const paymentAmmout: string = studentItem['paymentAmmout'];

    const receiptData: ReceiptData = {
      studentName,
      paymentAmmout,
      month: this.month,
      year: this.year
    };

    const receipts: ReceiptData[] = [
      receiptData
    ];

    const documentDefinition = this.scriptSvc.createReports(receipts, 3);
    const reportName = `Recibo ${this.year}-${this.month} ${studentName}.pdf`;
    pdfMake.createPdf(documentDefinition).download(reportName);
  }

  openInfo(studentItem: any) {
    // tslint:disable-next-line:no-string-literal
    const studentName: string = studentItem['studentName'];
    // tslint:disable-next-line:no-string-literal
    const paymentAmmout: string = studentItem['paymentAmmout'];

    const receiptData: ReceiptData = {
      studentName,
      paymentAmmout,
      month: this.month,
      year: this.year
    };

    const receipts: ReceiptData[] = [
      receiptData
    ];

    const documentDefinition = this.scriptSvc.createReports(receipts, 3);
    const reportName = `Recibo ${this.year}-${this.month} ${studentName}.pdf`;
    pdfMake.createPdf(documentDefinition).open();
  }

}
