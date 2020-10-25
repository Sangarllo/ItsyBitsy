import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminGuard } from '@auth/guards/admin.guard';

import { CourseDashboardView } from './course-dashboard-view/course-dashboard-view.component';
import { CoursesView } from './courses-view/courses-view.component';
import { CourseDetailView } from './course-detail-view/course-detail-view.component';
import { CourseEditView } from './course-edit-view/course-edit-view.component';
import { LessonDetailView } from './lesson-detail-view/lesson-detail-view.component';
import { LessonEditView } from './lesson-edit/lesson-edit-view.component';
import { TeacherAdminGuard } from '@auth/guards/teacherAdmin.guard';

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
    canActivate: [TeacherAdminGuard]
  },
  {
    path: ':id/editar',
    // canDeactivate: [CourseEditGuard], TODO
    component: CourseEditView,
    canActivate: [AdminGuard]
  },
  {
    path: ':courseId/lessons/:lessonId',
    component: LessonDetailView,
    canActivate: [TeacherAdminGuard]
  },
  {
    path: ':courseId/lessons/:lessonId/editar',
    component: LessonEditView,
    canActivate: [AdminGuard]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoursesRoutingModule { }
