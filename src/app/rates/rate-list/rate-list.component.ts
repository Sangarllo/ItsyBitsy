import { Component } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Rate } from '../../models/rate';


@Component({
  selector: 'app-rate-list',
  templateUrl: './rate-list.component.html',
  styleUrls: ['./rate-list.component.scss']
})
export class RateListComponent {

  private rateCollection: AngularFirestoreCollection<Rate>;
  rates: Observable<Rate[]>;

  constructor(private router: Router, afs: AngularFirestore) {
    this.rateCollection = afs.collection<Rate>('rates');
    this.rates = this.rateCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Rate;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
  }

  applyStyles(rate: Rate) {
    const styles = {
      'background-image': `url("${Rate.IMAGE_DEFAULT}")`,
      'background-size': 'cover'
    };
    return styles;
  }

  gotoRate(rate) {
    this.router.navigate([`${Rate.PATH_URL}/${rate.id}`]);
  }

  gotoNew() {
    this.router.navigate([`${Rate.PATH_URL}/0/editar`]);
  }
}
