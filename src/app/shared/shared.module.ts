import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddStudentComponent } from './add-student/add-student.component';
import { MaterialConfigurationModule } from '../material-configuration/material-configuration.module';
import { ShUserListComponent } from './sh-user-list/sh-user-list.component';
import { ShAttendanceListComponent } from './sh-attendance-list/sh-attendance-list.component';
import { ShCourseLessonsTableComponent } from './sh-course-lessons-table/sh-course-lessons-table.component';
import { ShCourseUsersTableComponent } from './sh-course-users-table/sh-course-users-table.component';
import { ShLessonAttendanceTableComponent } from './sh-lesson-attendance-table/sh-lesson-attendance-table.component';

@NgModule({
  declarations: [
    AddStudentComponent,
    ShUserListComponent,
    ShCourseUsersTableComponent,
    ShAttendanceListComponent,
    ShCourseLessonsTableComponent,
    ShLessonAttendanceTableComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialConfigurationModule
  ],
  exports: [
    AddStudentComponent,
    ShUserListComponent,
    ShCourseUsersTableComponent,
    ShAttendanceListComponent,
    ShCourseLessonsTableComponent,
    ShLessonAttendanceTableComponent,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialConfigurationModule
  ]
})
export class SharedModule { }
