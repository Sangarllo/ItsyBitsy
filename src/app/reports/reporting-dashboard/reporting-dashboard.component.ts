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

  gotoReportByMonth() {
    throw new Error('NotImplementedException');
  }
}