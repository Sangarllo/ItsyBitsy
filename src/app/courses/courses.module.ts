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
import { CalendarHeaderComponent } from './calendar/calendar-header.component';
import { CourseViewComponent } from './course-view/course-view.component';
import { CourseAddStudentComponent } from './course-add-student/course-add-student.component';
import { SharedModule } from '../shared/shared.module';
import { LessonAddStudentComponent } from './lesson-add-student/lesson-add-student.component';
import { LessonViewComponent } from './lesson-view/lesson-view.component';
import { AttendancesViewComponent } from './attendances-view/attendances-view.component';
import { CoursesTableComponent } from './courses-table/courses-table.component';

@NgModule({
  declarations: [
    CoursesListComponent,
    CourseDetailComponent,
    CourseEditComponent,
    LessonListComponent,
    LessonEditComponent,
    LessonDetailComponent,
    CalendarComponent,
    CalendarHeaderComponent,
    CourseViewComponent,
    CourseAddStudentComponent,
    LessonAddStudentComponent,
    LessonViewComponent,
    AttendancesViewComponent,
    CoursesTableComponent
  ],
  imports: [
    SharedModule,
    CoursesRoutingModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    }),
  ],
  providers: [
    DatePipe,
  ]
})
export class CoursesModule { }
