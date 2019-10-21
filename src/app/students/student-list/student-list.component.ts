import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.scss']
})
export class StudentListComponent {

  items: Observable<any[]>;
  constructor(db: AngularFirestore) {
    this.items = db.collection('students').valueChanges();
  }

}
