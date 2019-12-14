import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { DatesService, Month } from '../../services/dates.service';
import { RateService } from '../../services/rates.service';
import { Rate } from 'src/app/models/rate';
import Swal from 'sweetalert2';
import { Attendance } from '../../models/attendance.model';
import { UserDetails } from '../../models/user.model';
import { UserService } from '../../services/user.service';

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

  attendances: Attendance[];
  users: UserDetails[] = [];
  rates: Rate[] = [];


  constructor(
    public auth: AuthService,
    private dateSvc: DatesService,
    private userSvc: UserService,
    private rateSvc: RateService
  ) { }

  ngOnInit() {
    this.userSvc.getAllUsersDetails().subscribe(
      (data: UserDetails[]) => {
        this.users = data;
      });

    this.rateSvc.getAllRates().subscribe(
        (data: Rate[]) => {
          this.rates = data;
      });
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

  reportSummary(attendances: Attendance[]) {

      Swal.fire({
        icon: 'success',
        title: 'Obtenidas asistencias',
        text: `Se han encontrado ${attendances.length} asistencias`
      });

      this.attendances = attendances;

  }

  showList() {
    this.pageTitle = 'Informe de Asistencias por Mes';
    this.showReportFilters = true;
    this.reportErrors = null;
    this.dateIni = null;
    this.dateEnd = null;
    this.attendances = null;
  }

}
