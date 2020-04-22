import { NgModule } from '@angular/core';
import { DatePipe } from '@angular/common';
import { CoursesRoutingModule } from './courses-routing.module';
import { CourseDashboardView } from './course-dashboard-view/course-dashboard-view.component';
import { CourseDetailView } from './course-detail-view/course-detail-view.component';
import { CourseEditComponent } from './course-edit/course-edit.component';
import { LessonListComponent } from './lesson-list/lesson-list.component';
import { LessonDetailComponent } from './lesson-detail/lesson-detail.component';
import { LessonEditComponent } from './lesson-edit/lesson-edit.component';
import { CourseViewComponent } from './course-view/course-view.component';
import { SharedModule } from '../shared/shared.module';
import { LessonViewComponent } from './lesson-view/lesson-view.component';
import { CoursesTableComponent } from './courses-table/courses-table.component';

@NgModule({
  declarations: [
    CourseDetailView,
    CourseEditComponent,
    LessonListComponent,
    LessonEditComponent,
    LessonDetailComponent,
    CourseViewComponent,
    LessonViewComponent,
    CoursesTableComponent,
    CourseDashboardView,
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
