import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reporting-dashboard',
  templateUrl: './reporting-dashboard.component.html',
  styleUrls: ['./reporting-dashboard.component.scss']
})
export class ReportingDashboardComponent {

  constructor(
    private router: Router,
  ) { }

  gotoReportByStudent() {
    this.router.navigate([`informes/asistencias/estudiantes`]);
  }

  gotoReportByStudentMonth() {
    this.router.navigate([`informes/asistencias/estudiantes/mes`]);
  }

  gotoReportByMonth() {
    this.router.navigate([`informes/asistencias/mes`]);
  }

  gotoCoursesDashboard() {
    this.router.navigate([`cursos/dashboard`]);
  }
}
