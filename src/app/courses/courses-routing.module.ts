import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CoursesListComponent } from './courses-list/courses-list.component';
import { CourseDetailComponent } from './course-detail/course-detail.component';
import { CourseEditComponent } from './course-edit/course-edit.component';
import { LessonListComponent } from './lesson-list/lesson-list.component';
import { LessonEditComponent } from './lesson-edit/lesson-edit.component';
import { LessonDetailComponent } from './lesson-detail/lesson-detail.component';
import { CalendarComponent } from './calendar/calendar.component';
import { CourseAddStudentComponent } from './course-add-student/course-add-student.component';
import { LessonAddStudentComponent } from './lesson-add-student/lesson-add-student.component';
import { CoursesTableComponent } from './courses-table/courses-table.component';
import { LessonsTableComponent } from './lessons-table/lessons-table.component';

const routes: Routes = [
  {
    path: '',
    component: CoursesTableComponent
  },
  {
    path: 'list',
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
    path: ':id/estudiantes',
    component: CourseAddStudentComponent
  },
  {
    path: ':courseId/lessons',
    component: LessonsTableComponent
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
  {
    path: ':courseId/lessons/:lessonId/estudiantes',
    component: LessonAddStudentComponent
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoursesRoutingModule { }
