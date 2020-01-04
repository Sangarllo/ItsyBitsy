import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RateDetailComponent } from './rate-detail/rate-detail.component';
import { RateEditComponent } from './rate-edit/rate-edit.component';
import { RatesTableComponent } from './rates-table/rates-table.component';
import { AdminGuard } from '../services/admin.guard';


const routes: Routes = [
  {
    path: '',
    component: RatesTableComponent,
    canActivate: [AdminGuard]

  },
  {
    path: ':id',
    component: RateDetailComponent,
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
