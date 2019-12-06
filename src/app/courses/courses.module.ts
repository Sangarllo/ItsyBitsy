import { NgModule } from '@angular/core';
import { DatePipe } from '@angular/common';
import { CoursesRoutingModule } from './courses-routing.module';
import { CourseDetailComponent } from './course-detail/course-detail.component';
import { CourseEditComponent } from './course-edit/course-edit.component';
import { LessonListComponent } from './lesson-list/lesson-list.component';
import { LessonDetailComponent } from './lesson-detail/lesson-detail.component';
import { LessonEditComponent } from './lesson-edit/lesson-edit.component';
import { CourseViewComponent } from './course-view/course-view.component';
import { CourseAddStudentComponent } from './course-add-student/course-add-student.component';
import { SharedModule } from '../shared/shared.module';
import { LessonAddStudentComponent } from './lesson-add-student/lesson-add-student.component';
import { LessonViewComponent } from './lesson-view/lesson-view.component';
import { AttendancesViewComponent } from './attendances-view/attendances-view.component';
import { CoursesTableComponent } from './courses-table/courses-table.component';

@NgModule({
  declarations: [
    CourseDetailComponent,
    CourseEditComponent,
    LessonListComponent,
    LessonEditComponent,
    LessonDetailComponent,
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
  ],
  providers: [
    DatePipe,
  ]
})
export class CoursesModule { }
