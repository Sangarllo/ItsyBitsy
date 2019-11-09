import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { CalendarEvent } from 'angular-calendar';
import { EventFormatterService } from '../../services/event-formatter.service';
import { ILesson } from '../../models/lesson.model';
import { colors } from './color';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { LessonsService } from '../../services/lessons.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalendarComponent implements OnInit {

  // tslint:disable-next-line: no-inferrable-types
  view: string = 'month';

  viewDate: Date = new Date();

  events: Array<CalendarEvent<{ id: number }>>;


  constructor(
    private eventFormatterService: EventFormatterService,
    private lessonsService: LessonsService
  ) {
  }

  ngOnInit() {
    this.events = this.eventFormatterService.getEventCalendar();
  }
}
