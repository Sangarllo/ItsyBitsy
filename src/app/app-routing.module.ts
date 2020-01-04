import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { Page401Component } from './page401/page401.component';
import { Page403Component } from './page403/page403.component';
import { AngularFireAuthGuard, hasCustomClaim, redirectUnauthorizedTo, redirectLoggedInTo } from '@angular/fire/auth-guard';

const redirectUnauthorizedToHome = () => redirectUnauthorizedTo(['home']);

const routes: Routes = [
  {
    path: 'usuarios',
    loadChildren: () => import('./users/users.module').then(mod => mod.UsersModule)
  },
  {
    path: 'cursos',
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToHome },
    loadChildren: () => import('./courses/courses.module').then(mod => mod.CoursesModule)
  },
  {
    path: 'tarifas',
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToHome },
    loadChildren: () => import('./rates/rates.module').then(mod => mod.RatesModule)
  },
  {
    path: 'informes',
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToHome },
    loadChildren: () => import('./reports/reports.module').then(mod => mod.ReportsModule)
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
