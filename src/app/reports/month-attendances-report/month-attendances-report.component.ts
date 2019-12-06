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
  selector: 'app-month-attendances-report',
  templateUrl: './month-attendances-report.component.html',
  styleUrls: ['./month-attendances-report.component.scss']
})
export class MonthAttendancesReportComponent implements OnInit {

  pageTitle = 'Informe de Asistencias por Mes';
  infoReport = '';
  errorMessage: string;
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
  dateIni: Date = null;
  dateEnd: Date = null;

  reportErrors: string[];

  constructor(
    public auth: AuthService,
    private dateSvc: DatesService,
    private rateSvc: RateService
  ) { }

  ngOnInit() {
  }

  getReport() {
    this.reportErrors = [];

    this.infoReport = `durante ${this.selectedMonth.name} ${this.selectedYear}`;
    this.pageTitle = `Informe de asistencias durante ${this.selectedMonth.name} ${this.selectedYear}`;

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

    this.infoLessons = `${reportSummary.nAttendancesConfirmed} asistencias confirmadas`;

    if ( ( reportSummary.nAttendancesConfirmed <= 0 ) ||
         ( reportSummary.nAttendances <= 0 ) ) {
      this.addError('No se han encontrado asistencias a clase');
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
    this.pageTitle = 'Informe de Estudiantes por Mes';
    this.showReportFilters = true;
    this.reportErrors = null;
    this.dateIni = null;
    this.dateEnd = null;
  }

  private addError(newError: string) {
    this.reportErrors.push(newError);
  }

}
