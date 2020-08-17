import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreModule, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';
import { Rate, RateType } from '@models/rate';
import { BrowserStack } from 'protractor/built/driverProviders';
import { RateData } from '@models/report-summary';

const PAYMENT_ERROR = -1;
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
                .where('listed', '==', true)
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
    if ( !rate ) {
      console.log(`No se puede hacer cálculo sin tarifa`);
      return PAYMENT_ERROR;
    }

    try {
      switch (rate.type) {
        case RateType.porAsistencia:
          return nAttendances * rate.price;

        case RateType.cuotaFijaMensual:
          return rate.price;

        default:
          console.log(`Error getting payment. Type ${rate.type}`);
          return PAYMENT_ERROR;
      }
    } catch (error) {
      console.log(`Error getting payment: ${error}`);
      return PAYMENT_ERROR;
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
      listed: true,
      id: '0',
      name: '',
      type: RateType.porAsistencia,
      price: 7.5,
      image: 'assets/rates/rate-default.png',
      students: []
    };
  }

  getReportData(rate: Rate): RateData {

    const name: string = rate.name;
    const type: string = rate.type;
    const price = rate.price;
    const studentNames = [];
    rate.students.forEach(student => {
      studentNames.push(student.displayName);
    });

    return {
      name,
      type,
      price,
      studentNames
    };
  }
}
