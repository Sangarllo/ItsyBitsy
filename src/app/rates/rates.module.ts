import { NgModule } from '@angular/core';

import { RatesRoutingModule } from './rates-routing.module';
import { SharedModule } from '../shared/shared.module';
import { RateDetailComponent } from './rate-detail/rate-detail.component';
import { RateEditComponent } from './rate-edit/rate-edit.component';
import { RatesTableComponent } from './rates-table/rates-table.component';


@NgModule({
  declarations: [
    RateDetailComponent,
    RateEditComponent,
    RatesTableComponent],
  imports: [
    RatesRoutingModule,
    SharedModule,
  ],
})
export class RatesModule { }
