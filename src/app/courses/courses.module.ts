import { NgModule } from '@angular/core';
import { DatePipe } from '@angular/common';
import { CoursesRoutingModule } from './courses-routing.module';
import { CourseDashboardView } from './course-dashboard-view/course-dashboard-view.component';
import { CourseDetailView } from './course-detail-view/course-detail-view.component';
import { CourseEditComponent } from './course-edit/course-edit.component';
import { LessonListComponent } from './lesson-list/lesson-list.component';
import { LessonDetailView } from './lesson-detail-view/lesson-detail-view.component';
import { LessonEditComponent } from './lesson-edit/lesson-edit.component';
import { SharedModule } from '../shared/shared.module';
import { CoursesTableComponent } from './courses-table/courses-table.component';

@NgModule({
  declarations: [
    CourseDashboardView,
    CourseDetailView,
    LessonDetailView,
    CourseEditComponent,
    LessonListComponent,
    LessonEditComponent,
    CoursesTableComponent,
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
