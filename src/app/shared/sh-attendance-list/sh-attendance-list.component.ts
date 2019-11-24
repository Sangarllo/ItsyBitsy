import { Component, Input } from '@angular/core';
import { Attendance } from '../../models/attendance.model';
import { Router } from '@angular/router';


@Component({
  selector: 'sh-attendance-list',
  templateUrl: './sh-attendance-list.component.html',
  styleUrls: ['./sh-attendance-list.component.scss']
})
export class ShAttendanceListComponent {

  @Input() attendanceList: Attendance[];

  constructor(
    private router: Router,
  ) { }

  applyStyles(attendance: Attendance) {
    const styles = {
      'background-image': `url("${attendance.studentImage}")`,
      'background-size': 'cover'
    };
    return styles;
  }

  // TODO: no tiene sentido
  gotoAttendance(attendance: Attendance) {
    console.log(`goto ${attendance.id}`);
    this.router.navigate([`${Attendance.PATH_URL}/${attendance.id}`]);
  }
}
