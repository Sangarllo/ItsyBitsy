import { NgModule } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule, MatIconModule } from '@angular/material';
import {MatSelectModule} from '@angular/material/select';
import {MatToolbarModule} from '@angular/material/toolbar';

const matModules = [MatCardModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatIconModule, MatSelectModule, MatToolbarModule ];

@NgModule({
  imports: [...matModules],
  exports: [...matModules]
})
export class MaterialConfigurationModule { }
