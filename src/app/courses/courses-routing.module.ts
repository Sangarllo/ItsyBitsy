import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CourseDetailComponent } from './course-detail/course-detail.component';
import { CourseEditComponent } from './course-edit/course-edit.component';
import { LessonListComponent } from './lesson-list/lesson-list.component';
import { LessonEditComponent } from './lesson-edit/lesson-edit.component';
import { LessonDetailComponent } from './lesson-detail/lesson-detail.component';
import { CoursesTableComponent } from './courses-table/courses-table.component';

const routes: Routes = [
  {
    path: '',
    component: CoursesTableComponent
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
    path: ':courseId/lessons/list',
    component: LessonListComponent
  },
  {
    path: ':courseId/lessons/:lessonId',
    component: LessonDetailComponent
  },
  {
    path: ':courseId/lessons/:lessonId/editar',
    component: LessonEditComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoursesRoutingModule { }
