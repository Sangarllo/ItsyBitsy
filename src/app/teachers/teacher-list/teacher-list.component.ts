import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-teacher-list',
  templateUrl: './teacher-list.component.html',
  styleUrls: ['./teacher-list.component.scss']
})
export class TeacherListComponent {

  items: Observable<any[]>;
  constructor(db: AngularFirestore) {
    this.items = db.collection('teachers').valueChanges();
  }

}
