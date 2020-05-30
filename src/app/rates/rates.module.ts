import { NgModule } from '@angular/core';

import { RatesRoutingModule } from './rates-routing.module';
import { SharedModule } from '@shared/shared.module';

import { RateDetailView } from './rate-detail-view/rate-detail-view.component';
import { RateEditView } from './rate-edit-view/rate-edit-view.component';
import { RatesView } from './rates-view/rates-view.component';


@NgModule({
  declarations: [
    RateDetailView,
    RateEditView,
    RatesView
  ],
  imports: [
    RatesRoutingModule,
    SharedModule,
  ],
})
export class RatesModule { }
