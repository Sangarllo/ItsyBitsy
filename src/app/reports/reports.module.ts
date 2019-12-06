import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { ReportsRoutingModule } from './reports-routing.module';
import { ReportingDashboardComponent } from './reporting-dashboard/reporting-dashboard.component';
import { StudentAttendancesReportComponent } from './student-attendances-report/student-attendances-report.component';
import { MonthStudentAttendancesReportComponent } from './month-student-attendances-report/month-student-attendances-report.component';
import { MonthAttendancesReportComponent } from './month-attendances-report/month-attendances-report.component';


@NgModule({
  declarations: [
    ReportingDashboardComponent,
    StudentAttendancesReportComponent,
    MonthStudentAttendancesReportComponent,
    MonthAttendancesReportComponent
  ],
  imports: [
    SharedModule,
    ReportsRoutingModule,
  ]
})
export class ReportsModule { }
