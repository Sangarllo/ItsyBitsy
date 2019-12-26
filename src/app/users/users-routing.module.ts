import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AngularFireAuthGuard } from '@angular/fire/auth-guard';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { UserViewComponent } from './user-view/user-view.component';
import { UsersTableComponent } from './users-table/users-table.component';
import { AdminGuard } from '../services/admin.guard';


const routes: Routes = [
  {
    path: '',
    component: UsersTableComponent,
    canActivate: [AdminGuard]
  },
  {
    path: 'perfil',
    component: UserProfileComponent,
    canActivate: [AngularFireAuthGuard]
  },
  {
    path: 'dashboard',
    component: UserDashboardComponent,
    canActivate: [AngularFireAuthGuard]
  },
  {
    path: ':id',
    component: UserDetailsComponent
  },
  {
    path: ':id/view',
    component: UserViewComponent
  },
  {
    path: ':id/editar',
    component: UserEditComponent
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
