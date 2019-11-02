import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentsRoutingModule } from './students-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { StudentFormComponent } from './student-form/student-form.component';
import { StudentNewComponent } from './student-new/student-new.component';
import { StudentListComponent } from './student-list/student-list.component';
import { MaterialConfigurationModule } from '../material-configuration/material-configuration.module';
import { StudentDetailsComponent } from './student-details/student-details.component';
import { StudentEditComponent } from './student-edit/student-edit.component';

@NgModule({
  declarations: [
    StudentFormComponent,
    StudentNewComponent,
    StudentListComponent,
    StudentDetailsComponent,
    StudentEditComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    StudentsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialConfigurationModule
  ]
})
export class StudentsModule { }
