import { FormControl } from '@angular/forms';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import {MatDatepickerInputEvent} from '@angular/material/datepicker';
import { DatesService } from '../../services/dates.service';

@Component({
  selector: 'app-sh-calendar-interval',
  templateUrl: './sh-calendar-interval.component.html',
  styleUrls: ['./sh-calendar-interval.component.scss']
})
export class ShCalendarIntervalComponent implements OnInit {

  @Input() dateIni: Date;
  @Input() dateEnd: Date;
  @Output() updateInterval = new EventEmitter<Date[]>();

  date1: any;
  date2: any;

  constructor(
    private dateSvc: DatesService
  ) {
    this.resetToday();
    console.log(`constructor dateIni: ${this.dateIni}`);
    console.log(`constructor dateEnd: ${this.dateEnd}`);
  }


  ngOnInit() {
    this.date1 = new FormControl(this.dateIni);
    this.date2 = new FormControl(this.dateEnd);
  }

  dateIniClicked(event: MatDatepickerInputEvent<Date>) {
    console.log(`dateIniClicked: ${event.value}`);
    this.dateIni = new Date(event.value);
    this.onUpdateInterval();
  }

  dateEndClicked(event: MatDatepickerInputEvent<Date>) {
    console.log(`dateEndClicked: ${event.value}`);
    this.dateEnd = new Date(event.value);
    this.onUpdateInterval();
  }

  addWeek() {
    this.moveInterval(7);
  }

  removeWeek() {
    this.moveInterval(-7);
  }

  moveInterval(nDays: number): void {

    console.log(`nDays ${nDays}`);
    this.dateIni.setDate(this.dateIni.getDate() + nDays);
    this.dateEnd.setDate(this.dateEnd.getDate() + nDays);

    this.date1 = new FormControl(this.dateIni);
    this.date2 = new FormControl(this.dateEnd);

    this.onUpdateInterval();
  }

  onUpdateInterval() {
    console.log(`dateIni (${this.dateIni})`);
    console.log(`dateEnd (${this.dateEnd})`);
    this.updateInterval.emit([this.dateIni, this.dateEnd]);
  }

  resetToday() {

    // Fechas que limitan la semana
    this.dateIni = this.dateSvc.getWeekMonday();
    this.dateEnd = this.dateSvc.getWeekFriday();

    this.date1 = new FormControl(this.dateIni);
    this.date2 = new FormControl(this.dateEnd);

    this.updateInterval.emit([this.dateIni, this.dateEnd]);
  }

}
