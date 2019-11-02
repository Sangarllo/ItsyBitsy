import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StudentListComponent } from './student-list/student-list.component';
import { StudentDetailsComponent } from './student-details/student-details.component';
import { StudentEditComponent } from './student-edit/student-edit.component';


const routes: Routes = [
  {
    path: '',
    component: StudentListComponent
  },
  {
    path: ':id',
    component: StudentDetailsComponent
  },
  {
    path: ':id/editar',
    // canDeactivate: [ProductEditGuard], TODO
    component: StudentEditComponent
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentsRoutingModule { }
