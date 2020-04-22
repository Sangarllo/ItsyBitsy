import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminGuard } from '../services/admin.guard';

import { CourseDashboardView } from './course-dashboard-view/course-dashboard-view.component';
import { LessonDashboardComponent } from './lesson-dashboard/lesson-dashboard.component';

import { CourseDetailComponent } from './course-detail/course-detail.component';
import { CourseEditComponent } from './course-edit/course-edit.component';
import { LessonListComponent } from './lesson-list/lesson-list.component';
import { LessonEditComponent } from './lesson-edit/lesson-edit.component';
import { LessonDetailComponent } from './lesson-detail/lesson-detail.component';
import { CoursesTableComponent } from './courses-table/courses-table.component';

const routes: Routes = [
  {
    path: '',
    component: CoursesTableComponent,
    canActivate: [AdminGuard]
  },
  {
    path: 'dashboard',
    component: CourseDashboardView,
    canActivate: [AdminGuard]
  },
  {
    path: 'lesson-dashboard',
    component: LessonDashboardComponent,
    canActivate: [AdminGuard]
  },
  {
    path: ':id',
    component: CourseDetailComponent,
    canActivate: [AdminGuard]
  },
  {
    path: ':id/editar',
    // canDeactivate: [CourseEditGuard], TODO
    component: CourseEditComponent,
    canActivate: [AdminGuard]
  },
  {
    path: ':courseId/lessons/list',
    component: LessonListComponent,
    canActivate: [AdminGuard]
  },
  {
    path: ':courseId/lessons/:lessonId',
    component: LessonDetailComponent,
    canActivate: [AdminGuard]
  },
  {
    path: ':courseId/lessons/:lessonId/editar',
    component: LessonEditComponent,
    canActivate: [AdminGuard]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoursesRoutingModule { }
