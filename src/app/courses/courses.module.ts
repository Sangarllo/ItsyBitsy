import { NgModule } from '@angular/core';
import { DatePipe } from '@angular/common';
import { CoursesRoutingModule } from './courses-routing.module';
import { CourseDetailComponent } from './course-detail/course-detail.component';
import { CourseEditComponent } from './course-edit/course-edit.component';
import { LessonListComponent } from './lesson-list/lesson-list.component';
import { LessonDetailComponent } from './lesson-detail/lesson-detail.component';
import { LessonEditComponent } from './lesson-edit/lesson-edit.component';
import { CourseViewComponent } from './course-view/course-view.component';
import { SharedModule } from '../shared/shared.module';
import { LessonViewComponent } from './lesson-view/lesson-view.component';
import { AttendancesViewComponent } from './attendances-view/attendances-view.component';
import { CoursesTableComponent } from './courses-table/courses-table.component';
import { CourseDashboardComponent } from './course-dashboard/course-dashboard.component';

@NgModule({
  declarations: [
    CourseDetailComponent,
    CourseEditComponent,
    LessonListComponent,
    LessonEditComponent,
    LessonDetailComponent,
    CourseViewComponent,
    LessonViewComponent,
    AttendancesViewComponent,
    CoursesTableComponent,
    CourseDashboardComponent
  ],
  imports: [
    SharedModule,
    CoursesRoutingModule,
  ],
  providers: [
    DatePipe,
  ]
})
export class CoursesModule { }
