import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { LessonsRoutingModule } from './lessons-routing.module';
import { LessonListComponent } from './lesson-list/lesson-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialConfigurationModule } from '../material-configuration/material-configuration.module';


@NgModule({
  declarations: [
    LessonListComponent
  ],
  imports: [
    CommonModule,
    LessonsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialConfigurationModule
  ],
  providers: [
    DatePipe,
  ]
})
export class LessonsModule { }
