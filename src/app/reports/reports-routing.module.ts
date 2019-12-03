import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReportingDashboardComponent } from './reporting-dashboard/reporting-dashboard.component';
import { StudentAttendancesReportComponent } from './student-attendances-report/student-attendances-report.component';


const routes: Routes = [
  {
    path: '',
    component: ReportingDashboardComponent
  },
  {
    path: 'asistencias/estudiantes/:id',
    component: StudentAttendancesReportComponent
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportsRoutingModule { }
