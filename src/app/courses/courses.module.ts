import { NgModule } from '@angular/core';
import { DatePipe } from '@angular/common';
import { CoursesRoutingModule } from './courses-routing.module';
import { CourseDashboardView } from './course-dashboard-view/course-dashboard-view.component';
import { CourseDetailView } from './course-detail-view/course-detail-view.component';
import { CoursesView } from './courses-view/courses-view.component';
import { LessonDetailView } from './lesson-detail-view/lesson-detail-view.component';
import { CourseEditComponent } from './course-edit/course-edit.component';
import { LessonListComponent } from './lesson-list/lesson-list.component';
import { LessonEditComponent } from './lesson-edit/lesson-edit.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    CourseDashboardView,
    CoursesView,
    CourseDetailView,
    LessonDetailView,
    CourseEditComponent,
    LessonListComponent,
    LessonEditComponent,
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
