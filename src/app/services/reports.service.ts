import moment from 'moment';
import { Injectable } from '@angular/core';

import { Attendance } from '@models/attendance.model';
import { AttendanceData, CourseData } from '@models/report-summary';
import { AttendancesService } from '@services/attendances.service';
import { Course } from '@models/course.model';
import { CoursesService } from '@services/courses.service';

@Injectable({
  providedIn: 'root'
})
export class ReportsService {

  constructor(
    private attendancesSvc: AttendancesService,
    private courseSvc: CoursesService
  ) { }

  // A. Attendances -----

  getAttendancesReportData(attendances: unknown[]): AttendanceData[] {

    const data: AttendanceData[] = [];
    attendances.forEach(
      (attendance: Attendance) => {
        data.push(this.attendancesSvc.getReportData(attendance));
      });
    return data;
  }

  getAttendancesDataTable(attendancesData: AttendanceData[]): any {

    const bodyHeader = [ 'Fecha', 'Estado', 'Estudiante', 'Curso', '' ];
    return {
      headerRows: 1,
      widths: [ 'auto', 'auto', 'auto', 'auto', 'auto' ],
      body: this.getAttendancesBodyTable(bodyHeader, attendancesData)
    };
  }

  private getAttendancesBodyTable(bodyHeader: string[], attendancesData: AttendanceData[]): any {

    moment.locale('es');

    const bodyTable = [];
    bodyTable.push(bodyHeader);
    attendancesData.forEach(attendance => {
      bodyTable.push([
        { text: `${moment(attendance.lessonDate).format('DD MMMM YYYY')}`, fontSize: 9 },
        { text: `${attendance.status}`, fontSize: 8 },
        { text: `${attendance.studentName}`, fontSize: 8 },
        { text: `${attendance.courseName}`, fontSize: 8 },
        { text: `${attendance.comment}`, fontSize: 8 },
      ]);
    });

    return bodyTable;
  }

  // B. Courses -----

  getCoursesReportData(courses: unknown[]): CourseData[] {

    const data: CourseData[] = [];
    courses.forEach(
      (course: Course) => {
        data.push(this.courseSvc.getReportData(course));
      });
    return data;
  }

  getCoursesDataTable(coursesData: CourseData[]): any {

    const bodyHeader = [ 'Curso', 'Tipo', 'Horario', 'Profesor', 'Aforo' ];
    return {
      headerRows: 1,
      widths: [ 'auto', 'auto', 'auto', 'auto', 'auto' ],
      body: this.getCoursesBodyTable(bodyHeader, coursesData)
    };
  }

  private getCoursesBodyTable(bodyHeader: string[], coursesData: CourseData[]): any {
    const bodyTable = [];
    bodyTable.push(bodyHeader);
    coursesData.forEach(course => {
      bodyTable.push([
        { text: `Curso ${course.name}`, fontSize: 9 },
        { text: `${course.type}`, fontSize: 8 },
        { text: `${course.schedule}`, fontSize: 8 },
        { text: `${course.teacher}`, fontSize: 8 },
        { text: `${course.nStudents} estudiantes`, fontSize: 8 },
      ]);
    });

    return bodyTable;
  }
}
