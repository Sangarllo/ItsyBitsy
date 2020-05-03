import { NgModule } from '@angular/core';

import { RatesRoutingModule } from './rates-routing.module';
import { SharedModule } from '@shared/shared.module';

import { RateDetailView } from './rate-detail-view/rate-detail-view.component';
import { RateEditComponent } from './rate-edit/rate-edit.component';
import { RatesView } from './rates-view/rates-view.component';


@NgModule({
  declarations: [
    RateDetailView,
    RateEditComponent,
    RatesView
  ],
  imports: [
    RatesRoutingModule,
    SharedModule,
  ],
})
export class RatesModule { }
