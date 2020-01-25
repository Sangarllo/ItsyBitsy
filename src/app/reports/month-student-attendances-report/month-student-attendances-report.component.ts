import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { UserDetails } from '../../models/user.model';
import { UserService } from '../../services/user.service';
import { Observable } from 'rxjs';
import { DatesService, Month } from '../../services/dates.service';
import { ReportSummary } from '../../models/report-summary';
import { RateService } from '../../services/rates.service';
import { Rate } from 'src/app/models/rate';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-month-student-attendances-report',
  templateUrl: './month-student-attendances-report.component.html',
  styleUrls: ['./month-student-attendances-report.component.scss']
})
export class MonthStudentAttendancesReportComponent implements OnInit {

  pageTitle = 'Informe de Estudiantes por Mes';
  infoReport = '';
  errorMessage: string;
  student: UserDetails = null;
  selectedStudent: UserDetails;
  students$: Observable<UserDetails[]>;
  showReportFilters: boolean = true;
  infoCourses: string;
  infoLessons: string;
  infoRate: string;
  infoPayment: string;
  studentRate: Rate;

  selectedYear = new Date().getFullYear();
  YEARS: number[] = this.dateSvc.getYears();
  selectedMonth = this.dateSvc.getActualDefault();
  MONTHS: Month[] = this.dateSvc.getMonths();
  dateIni: Date;
  dateEnd: Date;

  reportErrors: string[];

  constructor(
    public auth: AuthService,
    private dateSvc: DatesService,
    private rateSvc: RateService,
    private userSvc: UserService
  ) { }

  ngOnInit() {
    this.students$ = this.userSvc.getAllStudents();
  }

  getReport() {
    this.reportErrors = [];
    this.student = this.selectedStudent;

    if (this.student.rateId) {
      this.rateSvc.getRate(this.student.rateId)
      .subscribe({
        next: rate => {
          this.studentRate = rate;
          this.infoRate = rate.name;
        },
        error: err => {
          this.infoRate = 'No hay tarifa aplicada';
          this.addError(this.infoRate);
        }
      });
    } else {
      this.infoRate = 'No hay tarifa aplicada';
      this.addError(this.infoRate);
    }


    this.infoReport = `durante ${this.selectedMonth.name} ${this.selectedYear}`;
    this.pageTitle = `Informe de asistencias de ${this.student.displayName} durante ${this.selectedMonth.name} ${this.selectedYear}`;

    this.dateIni = new Date(this.selectedYear, this.selectedMonth.int - 1, 1);
    this.dateEnd = ( this.selectedMonth.int === 12 ) ?
      new Date(this.selectedYear + 1, 0, 1) :
      new Date(this.selectedYear, this.selectedMonth.int, 1);

    this.showReportFilters = false;
  }

  reportSummary(reportSummary: ReportSummary) {

    // Número de Cursos y Asistencias
    this.infoCourses = ( reportSummary.courses.length === 1 ) ?
      `Curso: ${reportSummary.courses[0]}` :
      `Cursos Asistidos: ${reportSummary.courses.length}`;

    this.infoLessons = `${reportSummary.nAttendancesConfirmed} presencias`;

    if ( ( reportSummary.nAttendancesConfirmed <= 0 ) ||
         ( reportSummary.nAttendances <= 0 ) ) {
      this.addError('No se han encontrado asistencias a clase');
    }

    // Método de pago
    let paymentMethod: string;
    if ( this.student.paymentMethod ) {
      paymentMethod = this.student.paymentMethod;
    } else {
      paymentMethod = 'No establecido';
      this.addError('Hay que establecer un método de pago para el estudiante');
    }

    // Cantidad a pagar
    if ( this.studentRate ) {
      const payment = this.rateSvc.calculatePayment(this.studentRate, reportSummary.nAttendancesConfirmed);
      if ( payment >= 0 ) {
        this.infoPayment = `${payment}€ (${paymentMethod})`;
      } else {
        this.infoPayment = 'Problemas al Calcularlo';
        this.addError('Hay problemas en el cálculo de la cantidad a pagar');
      }
    }

    console.log(`Info: ${reportSummary.info}`);
    console.log(`Selected: ${JSON.stringify(reportSummary)}`);

    if ( this.reportErrors.length > 0 ) {
      Swal.fire({
        icon: 'error',
        title: 'Hubo algún error',
        text: 'Resuelve los errores detectados para generar informes válidos'
      });
    }
  }

  showList() {
    this.student = null;
    this.pageTitle = 'Informe de Estudiantes por Mes';
    this.showReportFilters = true;
    this.reportErrors = null;
  }

  private addError(newError: string) {
    this.reportErrors.push(newError);
  }

}
