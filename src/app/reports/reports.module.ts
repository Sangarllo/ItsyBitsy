import { NgModule } from '@angular/core';

import { ReportsRoutingModule } from './reports-routing.module';
import { ReportingDashboardComponent } from './reporting-dashboard/reporting-dashboard.component';
import { StudentAttendancesReportComponent } from './student-attendances-report/student-attendances-report.component';
import { SharedModule } from '../shared/shared.module';
import { MonthStudentAttendancesReportComponent } from './month-student-attendances-report/month-student-attendances-report.component';


@NgModule({
  declarations: [
    ReportingDashboardComponent,
    StudentAttendancesReportComponent,
    MonthStudentAttendancesReportComponent
  ],
  imports: [
    SharedModule,
    ReportsRoutingModule,
  ]
})
export class ReportsModule { }
