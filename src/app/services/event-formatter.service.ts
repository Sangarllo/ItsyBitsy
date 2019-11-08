import { Injectable } from '@angular/core';
import { CalendarEvent } from 'angular-calendar';
import { colors } from '../courses/calendar/color';

@Injectable({
  providedIn: 'root'
})
export class EventFormatterService {

  constructor() { }

  getEventCalendar(): Array<CalendarEvent> {
    return [
    {
      title: 'Clase 1',
      color: colors.yellow,
      start: new Date(),
      meta: {
        id: 1
      }
    },
    {
      title: 'Clase 2',
      color: colors.blue,
      start: new Date(),
      meta: {
        id: 2
      }
    },
    {
      title: 'Clase 3',
      color: colors.red,
      start: new Date(),
      meta: {
        id: 3
      }
    },
    {
      title: 'Clase 4',
      color: colors.green,
      start: new Date(),
      meta: {
        id: 4
      }
    }
  ];
}
}
