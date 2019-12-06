import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreModule, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';
import { Rate, RateType } from '../models/rate';
import { BrowserStack } from 'protractor/built/driverProviders';


const RATE_COLLECTION = 'rates';

@Injectable({
  providedIn: 'root'
})
export class RateService {

  private rateCollection: AngularFirestoreCollection<Rate>;
  private rateDoc: AngularFirestoreDocument<Rate>;

  constructor(private afs: AngularFirestore) {
  }

  getAllRates(): Observable<Rate[]> {
    this.rateCollection = this.afs.collection(
      RATE_COLLECTION,
      ref => ref.where('current', '==', true)
                .orderBy('name')
    );

    return this.rateCollection.valueChanges();
  }

  getRate(rateId: string): Observable<any> {
    if (rateId === '0') {
      return of(this.initialize());
    } else {
      this.rateCollection = this.afs.collection(
        RATE_COLLECTION,
        ref => ref.where('current', '==', true)
      );
      return this.rateCollection.doc(rateId).valueChanges();
    }
  }

  calculatePayment(rate: Rate, nAttendances: number): number {
    switch (rate.type) {
      case RateType.porAsistencia:
        return nAttendances * rate.price;

      case RateType.cuotaFijaMensual:
        return rate.price;

      default:
        return -1;
    }
  }

  updateRate(rate: Rate): Observable<Rate> {
    this.rateDoc = this.rateCollection.doc(rate.id);
    this.rateDoc.update(rate);
    return of(rate);
  }

  createRate(rate: Rate): Observable<Rate> {
    // Persist a document id
    rate.id = this.afs.createId();
    this.rateCollection.doc(rate.id).set(rate);
    return of(rate);
  }

  deleteRate(id: string): Observable<{}> {
    this.rateDoc = this.rateCollection.doc(id);
    this.rateDoc.delete();
    return of({});
  }

  private initialize(): Rate {
    // Return an initialized object
    return {
      current: true,
      id: '0',
      name: '',
      type: RateType.porAsistencia,
      price: 7.5,
    };
  }
}
