import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent {

  items: Observable<any[]>;
  constructor(db: AngularFirestore) {
    this.items = db.collection('users').valueChanges();
  }

}
