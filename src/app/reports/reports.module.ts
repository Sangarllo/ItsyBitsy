import { NgModule } from '@angular/core';

import { ReportsRoutingModule } from './reports-routing.module';
import { ReportingDashboardComponent } from './reporting-dashboard/reporting-dashboard.component';
import { StudentAttendancesReportComponent } from './student-attendances-report/student-attendances-report.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [ReportingDashboardComponent, StudentAttendancesReportComponent],
  imports: [
    SharedModule,
    ReportsRoutingModule,
  ]
})
export class ReportsModule { }
