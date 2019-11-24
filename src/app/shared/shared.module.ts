import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddStudentComponent } from './add-student/add-student.component';
import { MaterialConfigurationModule } from '../material-configuration/material-configuration.module';
import { ShUserListComponent } from './sh-user-list/sh-user-list.component';
import { ShUserListChipsComponent } from './sh-user-list-chips/sh-user-list-chips.component';
import { ShAttendanceListComponent } from './sh-attendance-list/sh-attendance-list.component';

@NgModule({
  declarations: [
    AddStudentComponent,
    ShUserListComponent,
    ShUserListChipsComponent,
    ShAttendanceListComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialConfigurationModule
  ],
  exports: [
    AddStudentComponent,
    ShUserListComponent,
    ShUserListChipsComponent,
    ShAttendanceListComponent,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialConfigurationModule
  ]
})
export class SharedModule { }
