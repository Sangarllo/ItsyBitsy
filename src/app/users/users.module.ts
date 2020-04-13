import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { UsersRoutingModule } from './users-routing.module';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { FilterPipe } from './pipes/filter.pipe';
import { UsersTableComponent } from './users-table/users-table.component';
import { UserLessonsView } from './user-lessons-view/user-lessons-view.component';
import { UserDashboardView } from './user-dashboard-view/user-dashboard-view.component';
import { UserAttendancesView } from './user-attendances-view/user-attendances-view.component';
import { UserAttendancesReportView } from './user-attendances-report-view/user-attendances-report-view.component';

@NgModule({
  declarations: [
    UserProfileComponent,
    UserEditComponent,
    UserDetailsComponent,
    FilterPipe,
    UsersTableComponent,
    UserLessonsView,
    UserDashboardView,
    UserAttendancesView,
    UserAttendancesReportView
  ],
  imports: [
    SharedModule,
    UsersRoutingModule,
  ],
})
export class UsersModule { }
