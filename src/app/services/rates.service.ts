import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreModule, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';
import { Rate, RateType } from '../models/rate';


const RATE_COLLECTION = 'rates';

@Injectable({
  providedIn: 'root'
})
export class RateService {

  private rateCollection: AngularFirestoreCollection<Rate>;
  private rateDoc: AngularFirestoreDocument<Rate>;

  constructor(private afs: AngularFirestore) {
    this.rateCollection = afs.collection<Rate>(RATE_COLLECTION);
  }

  getRates(): Observable<Rate[]> {
    return this.rateCollection.valueChanges();
  }


  getRate(id: string): Observable<any> {
    if (id === '0') {
      return of(this.initialize());
    } else {
      return this.rateCollection.doc(id).valueChanges();
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
