import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CalendarEvent } from 'angular-calendar';
import { colors } from './color';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalendarComponent {

  // tslint:disable-next-line: no-inferrable-types
  view: string = 'month';

  viewDate: Date = new Date();

  events: Array<CalendarEvent<{ id: number }>> = [
    {
      title: 'Event 1',
      color: colors.yellow,
      start: new Date(),
      meta: {
        id: 1
      }
    },
    {
      title: 'Event 2',
      color: colors.blue,
      start: new Date(),
      meta: {
        id: 2
      }
    }
  ];
}
