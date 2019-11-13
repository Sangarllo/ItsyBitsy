import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentsRoutingModule } from './students-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { StudentListComponent } from './student-list/student-list.component';
import { MaterialConfigurationModule } from '../material-configuration/material-configuration.module';
import { StudentDetailsComponent } from './student-details/student-details.component';
import { StudentEditComponent } from './student-edit/student-edit.component';
import { UsersModule } from '../users/users.module';

@NgModule({
  declarations: [
    StudentListComponent,
    StudentDetailsComponent,
    StudentEditComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    StudentsRoutingModule,
    FormsModule,
    UsersModule,
    ReactiveFormsModule,
    MaterialConfigurationModule
  ]
})
export class StudentsModule { }
