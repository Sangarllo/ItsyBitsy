import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialConfigurationModule } from '../material-configuration/material-configuration.module';

import { UsersRoutingModule } from './users-routing.module';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UserListComponent } from './user-list/user-list.component';


@NgModule({
  declarations: [
    UserProfileComponent,
    UserListComponent
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    MaterialConfigurationModule
  ]
})
export class UsersModule { }
