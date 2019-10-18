import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { AuthGuard } from './services/auth.guard';

const routes: Routes = [
  {
    path: 'students',
    loadChildren: () => import('./students/students.module').then(mod => mod.StudentsModule)
  },
  {
    path: 'teachers',
    loadChildren: () => import('./teachers/teachers.module').then(mod => mod.TeachersModule)
  },
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
