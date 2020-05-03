import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AngularFireAuthGuard, hasCustomClaim, redirectUnauthorizedTo, redirectLoggedInTo } from '@angular/fire/auth-guard';
import { HomeComponent } from '@app/home/home.component';
import { Page401Component } from '@app/page401/page401.component';
import { Page403Component } from '@app/page403/page403.component';

const redirectUnauthorizedToHome = () => redirectUnauthorizedTo(['home']);

const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('@auth/login/login.module').then(m => m.LoginModule)
  },
  {
    path: 'register',
    loadChildren: () => import('@auth/register/register.module').then(m => m.RegisterModule) },
  {
    path: 'usuarios',
    loadChildren: () => import('@app/users/users.module').then(mod => mod.UsersModule)
  },
  {
    path: 'cursos',
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToHome },
    loadChildren: () => import('@app/courses/courses.module').then(mod => mod.CoursesModule)
  },
  {
    path: 'tarifas',
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToHome },
    loadChildren: () => import('@app/rates/rates.module').then(mod => mod.RatesModule)
  },
  {
    path: 'error-401',
    component: Page401Component
  },
  {
    path: 'error-403',
    component: Page403Component
  },
  {
    path: 'home',
    component: HomeComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
