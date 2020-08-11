import moment from 'moment';
import { Injectable } from '@angular/core';

import { Attendance } from '@models/attendance.model';
import { AttendanceData, CourseData, RateData } from '@models/report-summary';
import { AttendancesService } from '@services/attendances.service';
import { Course } from '@models/course.model';
import { CoursesService } from '@services/courses.service';
import { RateService } from '@services/rates.service';
import { Rate } from '../models/rate';

@Injectable({
  providedIn: 'root'
})
export class ReportsService {

  constructor(
    private attendancesSvc: AttendancesService,
    private courseSvc: CoursesService,
    private ratesSvc: RateService
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

    const bodyHeader = [ 'Tipo', 'Curso', 'Día', 'Horario', 'Profesor', 'Aforo' ];
    return {
      headerRows: 1,
      widths: [ 'auto', 'auto', 'auto', 'auto', 'auto', 'auto' ],
      body: this.getCoursesBodyTable(bodyHeader, coursesData)
    };
  }

  private getCoursesBodyTable(bodyHeader: string[], coursesData: CourseData[]): any {
    const bodyTable = [];
    bodyTable.push(bodyHeader);
    coursesData.forEach(course => {
      bodyTable.push([
        { text: `${course.type}`, fontSize: 8 },
        { text: `Curso ${course.name}`, fontSize: 9 },
        { text: `${course.scheduleDay}`, fontSize: 8 },
        { text: `${course.scheduleTime}`, fontSize: 8 },
        { text: `${course.teacher}`, fontSize: 8 },
        { text: `${course.nStudents} estudiantes`, fontSize: 8 },
      ]);
    });

    return bodyTable;
  }

  // C. Rates -----

  getRatesReportData(rates: unknown[]): RateData[] {

    const data: RateData[] = [];
    rates.forEach(
      (rate: Rate) => {
        data.push(this.ratesSvc.getReportData(rate));
      });
    return data;
  }

  getRatesDataTable(ratesData: RateData[]): any {

    const bodyHeader = [ 'Tarifa', 'Estudiantes', 'Listado' ];
    return {
      headerRows: 1,
      widths: [ 'auto', 'auto', 'auto' ],
      body: this.getRatesBodyTable(bodyHeader, ratesData)
    };
  }

  private getRatesBodyTable(bodyHeader: string[], ratesData: RateData[]): any {
    const bodyTable = [];
    bodyTable.push(bodyHeader);
    ratesData.forEach(rate => {
      bodyTable.push([
        { text: `Tarifa ${rate.name}`, fontSize: 14 },
        { text: `${rate.studentNames.length} estudiantes`, fontSize: 14 },
        {
          ul: this.getStudentsList(rate.studentNames, 10)
        }
      ]);
    });

    return bodyTable;
  }

  private getStudentsList(studentNames: string[], fontSize: number): any {
    const studentsList = [];
    studentNames.forEach( name => {
      studentsList.push({
        text: `${name}`,
        fontSize
      });
    });
    return studentsList;
  }
}
