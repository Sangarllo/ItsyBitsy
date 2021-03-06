import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddStudentComponent } from './add-student/add-student.component';
import { MaterialConfigurationModule } from '../material-configuration/material-configuration.module';
import { ShAttendanceListComponent } from './sh-attendance-list/sh-attendance-list.component';
import { ShCourseLessonsTableComponent } from './sh-course-lessons-table/sh-course-lessons-table.component';
import { ShCourseUsersTableComponent } from './sh-course-users-table/sh-course-users-table.component';
import { ShLessonAttendanceTableComponent } from './sh-lesson-attendance-table/sh-lesson-attendance-table.component';
import { ShUserAttendanceTableComponent } from './sh-user-attendance-table/sh-user-attendance-table.component';
import { ShMonthAttendanceTableComponent } from './sh-month-attendance-table/sh-month-attendance-table.component';
import { ShMonthAttendanceTableSummaryComponent } from './sh-month-attendance-table-summary/sh-month-attendance-table-summary.component';
import { ShAddStudentDialogComponent } from './sh-add-student-dialog/sh-add-student-dialog.component';
import { ShLessonsComponent } from './sh-lessons/sh-lessons.component';
import { ShCalendarIntervalComponent } from './sh-calendar-interval/sh-calendar-interval.component';
import { ShUserDataComponent } from './sh-user-data/sh-user-data.component';
import { ShCalendarIntervalMonthComponent } from './sh-calendar-interval-month/sh-calendar-interval-month.component';
import { ShCalendarDateComponent } from './sh-calendar-date/sh-calendar-date.component';
import { ShAttendancesComponent } from './sh-attendances/sh-attendances.component';
import { ShAttendancesSummaryComponent } from './sh-attendances-summary/sh-attendances-summary.component';
import { ShAttendancesItemsComponent } from './sh-attendances-items/sh-attendances-items.component';
import { ShStudentsItemsComponent } from './sh-students-items/sh-students-items.component';
import { ShCourseDataComponent } from './sh-course-data/sh-course-data.component';
import { ShCourseDataExtendedComponent } from './sh-course-data-extended/sh-course-data-extended.component';
import { ShLessonDataComponent } from './sh-lesson-data/sh-lesson-data.component';
import { ShRateDataComponent } from './sh-rate-data/sh-rate-data.component';
import { ShLoadingComponent } from './sh-loading/sh-loading.component';
import { ShNoDataComponent } from './sh-no-data/sh-no-data.component';
import { ShUserListComponent } from './sh-user-list/sh-user-list.component';
import { ShCommentsComponent } from './sh-comments/sh-comments.component';

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
    ShAttendancesComponent,
    ShCommentsComponent,
    ShAttendancesSummaryComponent,
    ShUserAttendanceTableComponent,
    ShMonthAttendanceTableComponent,
    ShMonthAttendanceTableSummaryComponent,
    ShLessonsComponent,
    ShCalendarIntervalMonthComponent,
    ShCalendarIntervalComponent,
    ShCalendarDateComponent,
    ShUserDataComponent,
    ShAttendancesItemsComponent,
    ShStudentsItemsComponent,
    ShCourseDataComponent,
    ShCourseDataExtendedComponent,
    ShLessonDataComponent,
    ShRateDataComponent,
    ShLoadingComponent,
    ShNoDataComponent,
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
    ShAttendancesItemsComponent,
    ShStudentsItemsComponent,
    ShCourseLessonsTableComponent,
    ShLessonAttendanceTableComponent,
    ShLessonsComponent,
    ShCommentsComponent,
    ShAttendancesComponent,
    ShAttendancesSummaryComponent,
    ShUserDataComponent,
    ShCourseDataComponent,
    ShCourseDataExtendedComponent,
    ShLessonDataComponent,
    ShRateDataComponent,
    ShCalendarIntervalMonthComponent,
    ShCalendarIntervalComponent,
    ShCalendarDateComponent,
    ShUserAttendanceTableComponent,
    ShMonthAttendanceTableComponent,
    ShMonthAttendanceTableSummaryComponent,
    ShLoadingComponent,
    ShNoDataComponent,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialConfigurationModule
  ]
})
export class SharedModule { }
