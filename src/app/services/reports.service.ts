import moment from 'moment';
import { Injectable } from '@angular/core';

import { Attendance } from '@models/attendance.model';
import { AttendanceData } from '@models/report-summary';
import { AttendancesService } from '@services/attendances.service';

@Injectable({
  providedIn: 'root'
})
export class ReportsService {

  constructor(
    private attendancesSvc: AttendancesService
  ) { }

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

}
