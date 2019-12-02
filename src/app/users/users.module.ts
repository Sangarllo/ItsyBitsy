import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialConfigurationModule } from '../material-configuration/material-configuration.module';

import { UsersRoutingModule } from './users-routing.module';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { UserViewComponent } from './user-view/user-view.component';
import { FilterPipe } from './pipes/filter.pipe';
import { UsersTableComponent } from './users-table/users-table.component';

@NgModule({
  declarations: [
    UserProfileComponent,
    UserEditComponent,
    UserDetailsComponent,
    UserDashboardComponent,
    UserViewComponent,
    FilterPipe,
    UsersTableComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    UsersRoutingModule,
    MaterialConfigurationModule
  ],
  exports: [
    UserViewComponent
  ]
})
export class UsersModule { }
