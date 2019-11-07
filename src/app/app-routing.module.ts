import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './services/auth.guard';

const routes: Routes = [
  {
    path: 'usuarios',
    loadChildren: () => import('./users/users.module').then(mod => mod.UsersModule)
  },
  {
    path: 'estudiantes',
    loadChildren: () => import('./students/students.module').then(mod => mod.StudentsModule)
  },
  {
    path: 'profesores',
    loadChildren: () => import('./teachers/teachers.module').then(mod => mod.TeachersModule)
  },
  {
    path: 'cursos',
    loadChildren: () => import('./courses/courses.module').then(mod => mod.CoursesModule)
  },
  {
    path: ':id',
    component: HomeComponent
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
