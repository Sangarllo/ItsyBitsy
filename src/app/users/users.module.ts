import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { UsersRoutingModule } from './users-routing.module';
import { UsersView } from './users-view/users-view.component';
import { UserDetailsView } from './user-details-view/user-details-view.component';
import { UserDetailsEditView } from './user-details-edit-view/user-details-edit-view.component';
import { UserLessonsView } from './user-lessons-view/user-lessons-view.component';
import { UserDashboardView } from './user-dashboard-view/user-dashboard-view.component';
import { UserAttendancesView } from './user-attendances-view/user-attendances-view.component';
import { UserAttendancesReportView } from './user-attendances-report-view/user-attendances-report-view.component';

@NgModule({
  declarations: [
    UsersView,
    UserDetailsView,
    UserDetailsEditView,
    UserLessonsView,
    UserDashboardView,
    UserAttendancesView,
    UserAttendancesReportView,
  ],
  imports: [
    SharedModule,
    UsersRoutingModule,
  ],
})
export class UsersModule { }
