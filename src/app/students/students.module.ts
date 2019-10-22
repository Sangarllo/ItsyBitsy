import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentsRoutingModule } from './students-routing.module';
import { StudentFormComponent } from './student-form/student-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StudentNewComponent } from './student-new/student-new.component';
import { StudentListComponent } from './student-list/student-list.component';
import {MatCardModule} from '@angular/material/card';

@NgModule({
  declarations: [
    StudentFormComponent,
    StudentNewComponent,
    StudentListComponent
  ],
  imports: [
    CommonModule,
    StudentsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule
  ]
})
export class StudentsModule { }
