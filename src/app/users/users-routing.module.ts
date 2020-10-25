import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AngularFireAuthGuard } from '@angular/fire/auth-guard';
import { AdminGuard } from '@auth/guards/admin.guard';
import { AuthGuard } from '@auth/guards/auth.guard';
import { TeacherAdminGuard } from '@auth/guards/teacherAdmin.guard';

import { UsersView } from './users-view/users-view.component';
import { UserLessonsView } from './user-lessons-view/user-lessons-view.component';
import { UserDashboardView } from './user-dashboard-view/user-dashboard-view.component';
import { UserCommentsView } from './user-comments-view/user-comments-view.component';
import { UserAttendancesView } from './user-attendances-view/user-attendances-view.component';
import { UserAttendancesReportView } from './user-attendances-report-view/user-attendances-report-view.component';
import { UserDetailsView } from './user-details-view/user-details-view.component';

import { UserDetailsEditView } from './user-details-edit-view/user-details-edit-view.component';

const routes: Routes = [
  {
    path: '',
    component: UsersView,
    canActivate: [AdminGuard]
  },
  {
    path: 'perfil',
    component: UserDetailsView,
    canActivate: [AuthGuard]
  },
  {
    path: 'dashboard',
    component: UserDashboardView,
    canActivate: [AuthGuard]
  },
  {
    path: 'all/comentarios',
    component: UserCommentsView,
    canActivate: [AdminGuard]
  },
  {
    path: ':id',
    component: UserDetailsView,
    canActivate: [TeacherAdminGuard]
  },
  {
    path: ':id/editar',
    component: UserDetailsEditView,
    canActivate: [AdminGuard]
  },
  {
    path: ':id/clases',
    component: UserLessonsView,
    canActivate: [TeacherAdminGuard]
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
