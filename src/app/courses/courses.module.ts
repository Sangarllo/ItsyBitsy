import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialConfigurationModule } from '../material-configuration/material-configuration.module';
import { CoursesRoutingModule } from './courses-routing.module';
import { CoursesListComponent } from './courses-list/courses-list.component';
import { CourseDetailComponent } from './course-detail/course-detail.component';
import { CourseEditComponent } from './course-edit/course-edit.component';
import { LessonListComponent } from './lesson-list/lesson-list.component';
import { LessonDetailComponent } from './lesson-detail/lesson-detail.component';
import { LessonEditComponent } from './lesson-edit/lesson-edit.component';
import { CalendarComponent } from './calendar/calendar.component';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';

@NgModule({
  declarations: [
    CoursesListComponent,
    CourseDetailComponent,
    CourseEditComponent,
    LessonListComponent,
    LessonEditComponent,
    LessonDetailComponent,
    CalendarComponent
  ],
  imports: [
    CommonModule,
    CoursesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    }),
    MaterialConfigurationModule
  ],
  providers: [
    DatePipe,
  ]
})
export class CoursesModule { }
