import { Component, Input } from '@angular/core';
import { Attendance } from '@models/attendance.model';

@Component({
  selector: 'app-sh-attendances-items',
  templateUrl: './sh-attendances-items.component.html',
  styleUrls: ['./sh-attendances-items.component.scss']
})
export class ShAttendancesItemsComponent {

  @Input() attendances: Attendance[];

  constructor(
  ) { }
}
