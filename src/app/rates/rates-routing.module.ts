import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RateDetailView } from '@app/rates/rate-detail-view/rate-detail-view.component';
import { RateEditComponent } from '@app/rates/rate-edit/rate-edit.component';
import { RatesView } from '@app/rates/rates-view/rates-view.component';
import { CanAdminGuard } from '@auth/guards/can-admin.guard';


const routes: Routes = [
  {
    path: '',
    component: RatesView,
    canActivate: [CanAdminGuard]
  },
  {
    path: ':id',
    component: RateDetailView,
    canActivate: [CanAdminGuard]
  },
  {
    path: ':id/editar',
    // canDeactivate: [CourseEditGuard], TODO
    component: RateEditComponent,
    canActivate: [CanAdminGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RatesRoutingModule { }
