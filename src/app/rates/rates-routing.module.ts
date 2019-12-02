import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RateListComponent } from './rate-list/rate-list.component';
import { RateDetailComponent } from './rate-detail/rate-detail.component';
import { RateEditComponent } from './rate-edit/rate-edit.component';
import { RatesTableComponent } from './rates-table/rates-table.component';


const routes: Routes = [
  {
    path: '',
    component: RatesTableComponent
  },
  {
    path: 'list',
    component: RateListComponent
  },
  {
    path: ':id',
    component: RateDetailComponent
  },
  {
    path: ':id/editar',
    // canDeactivate: [CourseEditGuard], TODO
    component: RateEditComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RatesRoutingModule { }
