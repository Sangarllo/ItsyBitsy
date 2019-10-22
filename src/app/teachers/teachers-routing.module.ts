import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TeacherFormComponent } from './teacher-form/teacher-form.component';
import { TeacherNewComponent } from './teacher-new/teacher-new.component';
import { TeacherListComponent } from './teacher-list/teacher-list.component';


const routes: Routes = [
  {
    path: '',
    component: TeacherListComponent
  },
  {
    path: 'nuevo',
    component: TeacherNewComponent
  },
  {
    path: ':id',
    component: TeacherFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeachersRoutingModule { }
