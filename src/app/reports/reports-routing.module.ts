import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReportingDashboardComponent } from './reporting-dashboard/reporting-dashboard.component';
import { StudentAttendancesReportComponent } from './student-attendances-report/student-attendances-report.component';
import { MonthStudentAttendancesReportComponent } from './month-student-attendances-report/month-student-attendances-report.component';
import { MonthAttendancesReportComponent } from './month-attendances-report/month-attendances-report.component';
import { AdminGuard } from '../services/admin.guard';


const routes: Routes = [
  {
    path: '',
    component: ReportingDashboardComponent,
    canActivate: [AdminGuard]
  },
  {
    path: 'asistencias/estudiantes',
    component: StudentAttendancesReportComponent,
    canActivate: [AdminGuard]
  },
  {
    path: 'asistencias/estudiantes/mes',
    component: MonthStudentAttendancesReportComponent,
    canActivate: [AdminGuard]
  },
  {
    path: 'asistencias/mes',
    component: MonthAttendancesReportComponent,
    canActivate: [AdminGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportsRoutingModule { }
