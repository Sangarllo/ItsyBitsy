import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LessonListComponent } from './lesson-list/lesson-list.component';
import { LessonEditComponent } from './lesson-edit/lesson-edit.component';
import { LessonDetailComponent } from './lesson-detail/lesson-detail.component';



const routes: Routes = [
  {
    path: '',
    component: LessonListComponent
  },
  {
    path: ':id',
    component: LessonDetailComponent
  },
  {
    path: ':id/editar',
    // canDeactivate: [CourseEditGuard], TODO
    component: LessonEditComponent
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LessonsRoutingModule { }
