import { Injectable } from '@angular/core';
import { firestore } from 'firebase';


@Injectable({
  providedIn: 'root'
})
export class DatesService {

  constructor() { }

  fromFirebaseDate(ts: any): Date | null {
    if (ts instanceof firestore.Timestamp) {
      return new Date(`${ts.toDate().getFullYear()}-${ts.toDate().getMonth() + 1}-${ts.toDate().getDate()}`);
    } else {
      return null;
    }
  }

}
