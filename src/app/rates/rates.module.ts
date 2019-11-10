import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RatesRoutingModule } from './rates-routing.module';
import { RateDetailComponent } from './rate-detail/rate-detail.component';
import { RateListComponent } from './rate-list/rate-list.component';
import { RateEditComponent } from './rate-edit/rate-edit.component';
import { MaterialConfigurationModule } from '../material-configuration/material-configuration.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    RateDetailComponent,
    RateListComponent,
    RateEditComponent],
  imports: [
    CommonModule,
    RatesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialConfigurationModule
  ],
})
export class RatesModule { }
