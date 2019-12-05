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
  ]

  constructor() { }

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
      name: this.MONTH_NAMES[thisMonth - 1]
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

}
