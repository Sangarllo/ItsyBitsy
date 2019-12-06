import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReportingDashboardComponent } from './reporting-dashboard/reporting-dashboard.component';
import { StudentAttendancesReportComponent } from './student-attendances-report/student-attendances-report.component';
import { MonthStudentAttendancesReportComponent } from './month-student-attendances-report/month-student-attendances-report.component';
import { MonthAttendancesReportComponent } from './month-attendances-report/month-attendances-report.component';


const routes: Routes = [
  {
    path: '',
    component: ReportingDashboardComponent
  },
  {
    path: 'asistencias/estudiantes',
    component: StudentAttendancesReportComponent
  },
  {
    path: 'asistencias/estudiantes/mes',
    component: MonthStudentAttendancesReportComponent
  },
  {
    path: 'asistencias/mes',
    component: MonthAttendancesReportComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportsRoutingModule { }
