import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { UsersRoutingModule } from './users-routing.module';
import { FilterPipe } from './pipes/filter.pipe';
import { UsersView } from './users-view/users-view.component';
import { UserDetailsView } from './user-details-view/user-details-view.component';
import { UserLessonsView } from './user-lessons-view/user-lessons-view.component';
import { UserDashboardView } from './user-dashboard-view/user-dashboard-view.component';
import { UserAttendancesView } from './user-attendances-view/user-attendances-view.component';
import { UserAttendancesReportView } from './user-attendances-report-view/user-attendances-report-view.component';
import { UserEditComponent } from './user-edit/user-edit.component';

@NgModule({
  declarations: [
    UsersView,
    UserDetailsView,
    UserLessonsView,
    UserDashboardView,
    UserAttendancesView,
    UserAttendancesReportView,
    UserEditComponent,
    FilterPipe,
  ],
  imports: [
    SharedModule,
    UsersRoutingModule,
  ],
})
export class UsersModule { }
