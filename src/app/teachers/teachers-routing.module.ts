import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TeacherFormComponent } from './teacher-form/teacher-form.component';


const routes: Routes = [
  {
    path: '',
    component: TeacherFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeachersRoutingModule { }
