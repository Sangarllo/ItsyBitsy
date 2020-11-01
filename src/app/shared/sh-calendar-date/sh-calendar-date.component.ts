import { FormControl } from '@angular/forms';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import {MatDatepickerInputEvent} from '@angular/material/datepicker';
import { DatesService } from '@services/dates.service';

@Component({
  selector: 'app-sh-calendar-date',
  templateUrl: './sh-calendar-date.component.html',
  styleUrls: ['./sh-calendar-date.component.scss']
})
export class ShCalendarDateComponent implements OnInit {

  @Input() date: Date;
  @Output() updateDate = new EventEmitter<Date>();

  date1: any;

  constructor(
    private dateSvc: DatesService
  ) {
    this.resetToday();
    console.log(`constructor date: ${this.date}`);
  }


  ngOnInit() {
    this.date1 = new FormControl(this.date);
  }

  dateClicked(event: MatDatepickerInputEvent<Date>) {
    // console.log(`dateIniClicked: ${event.value}`);
    this.date = new Date(event.value);
    this.onUpdateInterval();
  }

  addDay() {
    this.moveInterval(1);
  }

  removeDay() {
    this.moveInterval(-1);
  }

  moveInterval(nDays: number): void {

    // console.log(`nDays ${nDays}`);
    this.date.setDate(this.date.getDate() + nDays);

    this.date1 = new FormControl(this.date);

    this.onUpdateInterval();
  }

  onUpdateInterval() {
    // console.log(`dateIni (${this.dateIni})`);
    // console.log(`dateEnd (${this.dateEnd})`);
    this.updateDate.emit(this.date);
  }

  resetToday() {

    // Fechas que limitan la semana
    this.date = this.dateSvc.getWeekMonday();
    this.date1 = new FormControl(this.date);

    this.updateDate.emit(this.date);
  }

}
