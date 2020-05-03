import { Injectable } from '@angular/core';
import { firestore } from 'firebase/app';

export interface Month {
  int: number;
  name: string;
}

@Injectable({
  providedIn: 'root'
})
export class DatesService {

  WEEKDAY_NAMES = [
    'domingo',
    'lunes',
    'martes',
    'miércoles',
    'jueves',
    'viernes',
    'sábados'
  ]

  MONTH_NAMES = [
    'enero',
    'febrero',
    'marzo',
    'abril',
    'mayo',
    'junio',
    'julio',
    'agosto',
    'septiembre',
    'octubre',
    'noviembre',
    'diciembre'
  ];

  constructor() {
  }

  getToday(): Date {
    const today = new Date();
    return today;
  }

  getWeekMonday(): Date {
    const date = new Date(this.getToday());
    // console.log(`getWeekMonday`);
    // console.log(`date: ${date}`);
    // console.log(`date.getDate(): ${date.getDate()}`);
    // console.log(`date.getDay(): ${date.getDay()}`);
    date.setDate(date.getDate() - date.getDay() + 1);
    // console.log(`date: ${date}`);
    return date;
  }

  getNextMonday(): Date {
    const date = new Date(this.getToday());
    date.setDate(date.getDate() - date.getDay() + 8);
    return date;
  }

  getWeekFriday(): Date {
    const date = new Date(this.getToday());
    date.setDate(date.getDate() - date.getDay() + 5);
    return date;
  }

  getNextFriday(): Date {
    const date = new Date(this.getToday());
    date.setDate(date.getDate() - date.getDay() + 12);
    return date;
  }

  getMonths(): Month[] {

    return [
      { int: 1, name: this.MONTH_NAMES[0] },
      { int: 2, name: this.MONTH_NAMES[1] },
      { int: 3, name: this.MONTH_NAMES[2] },
      { int: 4, name: this.MONTH_NAMES[3] },
      { int: 5, name: this.MONTH_NAMES[4] },
      { int: 6, name: this.MONTH_NAMES[5] },
      { int: 7, name: this.MONTH_NAMES[6] },
      { int: 8, name: this.MONTH_NAMES[7] },
      { int: 9, name: this.MONTH_NAMES[8] },
      { int: 10, name: this.MONTH_NAMES[9] },
      { int: 11, name: this.MONTH_NAMES[10] },
      { int: 12, name: this.MONTH_NAMES[11] },
    ];
  }

  getActualDefault(): Month {
    const thisMonth: number = new Date().getMonth();
    return {
      int: thisMonth + 1,
      name: this.MONTH_NAMES[thisMonth]
    };
  }

  getYears(): number[] {
    const YEARS = [];
    const thisYear: number = new Date().getFullYear();
    for ( let year = 2018; year <= ( thisYear + 1 ); year++ ) {
      YEARS.push(year);
    }
    return YEARS;
  }

  fromFirebaseDate(ts: any): Date | null {
    if (ts instanceof firestore.Timestamp) {
      return new Date(`${ts.toDate().getFullYear()}-${ts.toDate().getMonth() + 1}-${ts.toDate().getDate()}`);
    } else {
      return null;
    }
  }

  // lunes, 1
  getShortFormatedDate(date: Date): string {
    const weekday = this.WEEKDAY_NAMES[date.getDay()];
    const dd = date.getDate();
    // const month = this.MONTH_NAMES[date.getMonth()];

    const str: string = `${weekday} ${dd}`; // de ${month}
    return str;
  }

  // 1 de enero de 2002
  getLargeFormatedDate(date: Date): string {
    const dd = date.getDate();
    const month = this.MONTH_NAMES[date.getMonth()];
    const year = date.getFullYear();

    const str: string = `${dd} de ${month} de ${year}`;
    return str;
  }
}
