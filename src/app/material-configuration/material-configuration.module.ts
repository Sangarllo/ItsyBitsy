import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';

const matModules = [MatCardModule, MatButtonModule];

@NgModule({
  imports: [...matModules],
  exports: [...matModules]
})
export class MaterialConfigurationModule { }
