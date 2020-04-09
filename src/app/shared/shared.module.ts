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
import { ShUserAttendanceTableComponent } from './sh-user-attendance-table/sh-user-attendance-table.component';
import { ShMonthAttendanceTableComponent } from './sh-month-attendance-table/sh-month-attendance-table.component';
import { ShMonthAttendanceTableSummaryComponent } from './sh-month-attendance-table-summary/sh-month-attendance-table-summary.component';
import { ShAddStudentDialogComponent } from './sh-add-student-dialog/sh-add-student-dialog.component';
import { ShTeacherLessonsTableComponent } from './sh-teacher-lessons-table/sh-teacher-lessons-table.component';
import { ShLessonsComponent } from './sh-lessons/sh-lessons.component';
import { ShCalendarIntervalComponent } from './sh-calendar-interval/sh-calendar-interval.component';
import { ShUserDataComponent } from './sh-user-data/sh-user-data.component';

@NgModule({
  declarations: [
    AddStudentComponent,
    ShAddStudentDialogComponent,
    ShUserListComponent,
    ShCourseUsersTableComponent,
    ShAttendanceListComponent,
    ShCourseLessonsTableComponent,
    ShLessonAttendanceTableComponent,
    ShLessonsComponent,
    ShUserAttendanceTableComponent,
    ShTeacherLessonsTableComponent,
    ShMonthAttendanceTableComponent,
    ShMonthAttendanceTableSummaryComponent,
    ShLessonsComponent,
    ShCalendarIntervalComponent,
    ShUserDataComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialConfigurationModule
  ],
  exports: [
    AddStudentComponent,
    ShAddStudentDialogComponent,
    ShUserListComponent,
    ShCourseUsersTableComponent,
    ShAttendanceListComponent,
    ShCourseLessonsTableComponent,
    ShLessonAttendanceTableComponent,
    ShLessonsComponent,
    ShUserDataComponent,
    ShCalendarIntervalComponent,
    ShUserAttendanceTableComponent,
    ShTeacherLessonsTableComponent,
    ShMonthAttendanceTableComponent,
    ShMonthAttendanceTableSummaryComponent,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialConfigurationModule
  ]
})
export class SharedModule { }
