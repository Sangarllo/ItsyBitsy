import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeachersRoutingModule } from './teachers-routing.module';
import { TeacherFormComponent } from './teacher-form/teacher-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [TeacherFormComponent],
  imports: [
    CommonModule,
    TeachersRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class TeachersModule { }
