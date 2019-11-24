import { Component, Input } from '@angular/core';
import { AttendancesService } from '../../services/attendances.service';
import { Attendance } from '../../models/attendance.model';

@Component({
  selector: 'app-attendances-view',
  templateUrl: './attendances-view.component.html',
  styleUrls: ['./attendances-view.component.scss']
})
export class AttendancesViewComponent {

  @Input() attendanceArray: Attendance[];
  columnsToDisplay = ['studentName', 'status'];

  constructor() {}
}
