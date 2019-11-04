import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AngularFireAuthGuard } from '@angular/fire/auth-guard';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UserListComponent } from './user-list/user-list.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { UserDetailsComponent } from './user-details/user-details.component';


const routes: Routes = [
  {
    path: '',
    component: UserListComponent
  },
  {
    path: 'perfil',
    component: UserProfileComponent,
    canActivate: [AngularFireAuthGuard]
  },
  {
    path: ':id',
    component: UserDetailsComponent //
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
