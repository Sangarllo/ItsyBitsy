import { NgModule } from '@angular/core';
import { DatePipe } from '@angular/common';

import { SharedModule } from '@shared/shared.module';
import { CoursesRoutingModule } from './courses-routing.module';
import { CourseDashboardView } from './course-dashboard-view/course-dashboard-view.component';
import { CoursesView } from './courses-view/courses-view.component';
import { CourseDetailView } from './course-detail-view/course-detail-view.component';
import { CourseEditView } from './course-edit-view/course-edit-view.component';
import { LessonDetailView } from './lesson-detail-view/lesson-detail-view.component';
import { LessonEditView } from './lesson-edit/lesson-edit-view.component';
import { LessonAuditViewComponent } from './lesson-audit-view/lesson-audit-view.component';

@NgModule({
  declarations: [
    CourseDashboardView,
    CoursesView,
    CourseDetailView,
    LessonDetailView,
    CourseEditView,
    LessonEditView,
    LessonAuditViewComponent,
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
