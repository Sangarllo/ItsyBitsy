import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminGuard } from '@auth/guards/admin.guard';

import { CourseDashboardView } from './course-dashboard-view/course-dashboard-view.component';
import { CourseDetailView } from './course-detail-view/course-detail-view.component';
import { LessonDetailView } from './lesson-detail-view/lesson-detail-view.component';
import { CoursesView } from './courses-view/courses-view.component';

import { CourseEditComponent } from './course-edit/course-edit.component';
import { LessonEditComponent } from './lesson-edit/lesson-edit.component';

const routes: Routes = [
  {
    path: '',
    component: CoursesView,
    canActivate: [AdminGuard]
  },
  {
    path: 'dashboard',
    component: CourseDashboardView,
    canActivate: [AdminGuard]
  },
  {
    path: ':id',
    component: CourseDetailView,
    canActivate: [AdminGuard]
  },
  {
    path: ':id/editar',
    // canDeactivate: [CourseEditGuard], TODO
    component: CourseEditComponent,
    canActivate: [AdminGuard]
  },
  {
    path: ':courseId/lessons/:lessonId',
    component: LessonDetailView,
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
