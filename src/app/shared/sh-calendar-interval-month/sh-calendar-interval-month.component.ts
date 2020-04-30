import { FormControl } from '@angular/forms';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import {MatDatepickerInputEvent} from '@angular/material/datepicker';

import {MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {MatDatepicker} from '@angular/material/datepicker';

// Depending on whether rollup is used, moment needs to be imported differently.
// Since Moment.js doesn't have a default export, we normally need to import using the `* as`
// syntax. However, rollup creates a synthetic default module and we thus need to import it using
// the `default as` syntax.
import * as _moment from 'moment';
// tslint:disable-next-line:no-duplicate-imports
import {default as _rollupMoment, Moment} from 'moment';

const moment = _rollupMoment || _moment;

// See the Moment.js docs for the meaning of these formats:
// https://momentjs.com/docs/#/displaying/format/
export const MY_FORMATS = {
  parse: {
    dateInput: 'MM/YYYY',
  },
  display: {
    dateInput: 'MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-sh-calendar-interval-month',
  templateUrl: './sh-calendar-interval-month.component.html',
  styleUrls: ['./sh-calendar-interval-month.component.scss'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },

    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ],
})
export class ShCalendarIntervalMonthComponent implements OnInit {

  @Input() date: Date;
  @Output() updateMonth = new EventEmitter<Date>();

  dateMoment: _moment.Moment;
  dateTs: Date;
  date1: any;

  constructor() {
    this.dateMoment = moment(this.date);
    this.dateTs = new Date(this.dateMoment.year(), this.dateMoment.month(), this.dateMoment.date());
    console.log(`constructor date: ${this.dateTs}`);
  }


  ngOnInit() {
    this.dateMoment = moment(this.date);
    this.onUpdateMonth();
  }

  chosenYearHandler(normalizedYear: Moment) {
    const ctrlValue = this.date1.value;
    ctrlValue.year(normalizedYear.year());
    this.date1.setValue(ctrlValue);

    this.onUpdateMonth();
  }

  chosenMonthHandler(normalizedMonth: Moment, datepicker: MatDatepicker<Moment>) {
    const ctrlValue = this.date1.value;
    ctrlValue.month(normalizedMonth.month());
    this.date1.setValue(ctrlValue);
    datepicker.close();

    this.onUpdateMonth();
  }

  addMonth() {
    this.moveMonth(1);
  }

  removeMonth() {
    this.moveMonth(-1);
  }

  moveMonth(nMonths: number): void {
    this.dateMoment.add(nMonths, 'months');
    this.onUpdateMonth();
  }

  resetToday() {
    this.dateMoment = moment();
    this.onUpdateMonth();
  }

  onUpdateMonth() {

    this.fromMomentToTypescript();
    this.date1 = new FormControl(this.dateMoment);
    this.updateMonth.emit(this.dateTs);
  }

  fromMomentToTypescript() {
    this.dateTs = new Date(this.dateMoment.year(), this.dateMoment.month(), this.dateMoment.date());
  }

}
