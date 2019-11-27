import { Component, Input } from '@angular/core';
import { Attendance } from '../../models/attendance.model';

@Component({
  selector: 'sh-attendance-list',
  templateUrl: './sh-attendance-list.component.html',
  styleUrls: ['./sh-attendance-list.component.scss']
})
export class ShAttendanceListComponent {

  @Input() attendanceList: Attendance[];

  constructor(
  ) { }

  applyStyles(attendance: Attendance) {
    const styles = {
      'background-image': `url("${attendance.studentImage}")`,
      'background-size': 'cover'
    };
    return styles;
  }
}
