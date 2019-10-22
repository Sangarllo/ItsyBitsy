import { NgModule } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule, MatIconModule } from '@angular/material';

const matModules = [MatCardModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatIconModule ];

@NgModule({
  imports: [...matModules],
  exports: [...matModules]
})
export class MaterialConfigurationModule { }
