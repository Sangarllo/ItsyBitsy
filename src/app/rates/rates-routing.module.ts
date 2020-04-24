import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RateDetailView } from './rate-detail-view/rate-detail-view.component';
import { RateEditComponent } from './rate-edit/rate-edit.component';
import { RatesView } from './rates-view/rates-view.component';
import { AdminGuard } from '../services/admin.guard';


const routes: Routes = [
  {
    path: '',
    component: RatesView,
    canActivate: [AdminGuard]

  },
  {
    path: ':id',
    component: RateDetailView,
    canActivate: [AdminGuard]
  },
  {
    path: ':id/editar',
    // canDeactivate: [CourseEditGuard], TODO
    component: RateEditComponent,
    canActivate: [AdminGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RatesRoutingModule { }
