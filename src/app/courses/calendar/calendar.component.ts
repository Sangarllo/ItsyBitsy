import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CalendarEvent } from 'angular-calendar';
import { EventFormatterService } from '../../services/event-formatter.service';

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

  events: Array<CalendarEvent<{ id: number }>>;

  constructor(
    private eventFormatterService: EventFormatterService,
  ) {
    this.events = eventFormatterService.getEventCalendar();
  }

}
