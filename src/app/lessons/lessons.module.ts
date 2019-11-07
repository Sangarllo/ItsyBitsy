import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { LessonsRoutingModule } from './lessons-routing.module';
import { LessonListComponent } from './lesson-list/lesson-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialConfigurationModule } from '../material-configuration/material-configuration.module';
import { LessonEditComponent } from './lesson-edit/lesson-edit.component';
import { LessonDetailComponent } from './lesson-detail/lesson-detail.component';


@NgModule({
  declarations: [
    LessonListComponent,
    LessonEditComponent,
    LessonDetailComponent
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
