import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { UserDetails } from '../../models/user.model';
import { UserService } from '../../services/user.service';
import { Observable } from 'rxjs';
import { DatesService, Month } from '../../services/dates.service';

@Component({
  selector: 'app-month-student-attendances-report',
  templateUrl: './month-student-attendances-report.component.html',
  styleUrls: ['./month-student-attendances-report.component.scss']
})
export class MonthStudentAttendancesReportComponent implements OnInit {

  pageTitle = 'Informe de Estudiantes por Mes';
  errorMessage: string;
  student: UserDetails = null;
  selectedStudent: UserDetails;
  students$: Observable<UserDetails[]>;
  showReportFilters: boolean = true;

  selectedYear = new Date().getFullYear();
  YEARS: number[] = this.dateSvc.getYears();
  selectedMonth = this.dateSvc.getActualDefault();
  MONTHS: Month[] = this.dateSvc.getMonths();
  dateIni: Date;
  dateEnd: Date;

  constructor(
    public auth: AuthService,
    private dateSvc: DatesService,
    private userSvc: UserService
  ) { }

  ngOnInit() {
    this.students$ = this.userSvc.getAllStudents();
  }

  getReport() {
    this.student = this.selectedStudent;
    this.dateIni = new Date(this.selectedYear, this.selectedMonth.int - 1, 1);
    this.dateEnd = ( this.selectedMonth.int === 12 ) ?
      new Date(this.selectedYear + 1, 0, 1) :
      new Date(this.selectedYear, this.selectedMonth.int, 1);
    console.log(`dateIni: ${this.dateIni}`);
    console.log(`dateEnd: ${this.dateEnd}`);
    this.pageTitle = `Informe de asistencias de ${this.student.displayName} durante ${this.selectedMonth.name} ${this.selectedYear}`;
    this.showReportFilters = false;
  }

  showList() {
    this.student = null;
    this.pageTitle = 'Informe de Estudiantes por Mes';
    this.showReportFilters = true;
  }

}
