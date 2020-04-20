import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AngularFireAuthGuard } from '@angular/fire/auth-guard';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { UsersTableComponent } from './users-table/users-table.component';
import { AdminGuard } from '../services/admin.guard';
import { AuthGuard } from '../services/auth.guard';
import { UserLessonsView } from './user-lessons-view/user-lessons-view.component';
import { UserDashboardView } from './user-dashboard-view/user-dashboard-view.component';
import { UserAttendancesView } from './user-attendances-view/user-attendances-view.component';
import { UserAttendancesReportView } from './user-attendances-report-view/user-attendances-report-view.component';


const routes: Routes = [
  {
    path: '',
    component: UsersTableComponent,
    canActivate: [AdminGuard]
  },
  {
    path: 'perfil',
    component: UserProfileComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'dashboard',
    component: UserDashboardView,
    canActivate: [AuthGuard]
  },
  {
    path: ':id',
    component: UserDetailsComponent,
    canActivate: [AdminGuard]
  },
  {
    path: ':id/editar',
    component: UserEditComponent,
    canActivate: [AdminGuard]
  },
  {
    path: ':id/clases',
    component: UserLessonsView,
    canActivate: [AdminGuard]
  },
  {
    path: ':id/asistencias',
    component: UserAttendancesView,
    canActivate: [AdminGuard]
  },
  {
    path: ':id/resumen-asistencias',
    component: UserAttendancesReportView,
    canActivate: [AdminGuard]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
