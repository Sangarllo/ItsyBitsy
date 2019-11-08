import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CoursesListComponent } from './courses-list/courses-list.component';
import { CourseDetailComponent } from './course-detail/course-detail.component';
import { CourseEditComponent } from './course-edit/course-edit.component';
import { LessonListComponent } from './lesson-list/lesson-list.component';
import { LessonEditComponent } from './lesson-edit/lesson-edit.component';
import { LessonDetailComponent } from './lesson-detail/lesson-detail.component';
import { CalendarComponent } from './calendar/calendar.component';

const routes: Routes = [
  {
    path: '',
    component: CoursesListComponent
  },
  {
    path: 'calendar',
    component: CalendarComponent
  },
  {
    path: ':id',
    component: CourseDetailComponent
  },
  {
    path: ':id/editar',
    // canDeactivate: [CourseEditGuard], TODO
    component: CourseEditComponent
  },
  {
    path: ':courseId/lessons',
    component: LessonListComponent
  },
  {
    path: ':courseId/lessons/:id',
    component: LessonDetailComponent
  },
  {
    path: ':courseId/lessons/:id/editar',
    component: LessonEditComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoursesRoutingModule { }
