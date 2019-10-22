import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeachersRoutingModule } from './teachers-routing.module';
import { TeacherFormComponent } from './teacher-form/teacher-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TeacherListComponent } from './teacher-list/teacher-list.component';
import { TeacherNewComponent } from './teacher-new/teacher-new.component';
import {MatCardModule} from '@angular/material/card';

@NgModule({
  declarations: [TeacherFormComponent, TeacherListComponent, TeacherNewComponent],
  imports: [
    CommonModule,
    TeachersRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule
  ]
})
export class TeachersModule { }
