import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestoreDocument, AngularFirestore } from '@angular/fire/firestore';
import { UserDetails } from '../models/user.model';
import { Observable, of } from 'rxjs';

const USER_DETAIL_COLLECTION = 'user-details';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private studentCollection: AngularFirestoreCollection<UserDetails>;
  private studentDoc: AngularFirestoreDocument<UserDetails>;

  constructor(private afs: AngularFirestore) {
    this.studentCollection = afs.collection<UserDetails>(USER_DETAIL_COLLECTION);
  }

  createUserDetails(userDetails: UserDetails): Observable<UserDetails> {
    // Persist a document id
    const id = userDetails.uid;
    console.log(`Creating in UserDatils Database user ${id}`);
    this.studentCollection.doc(id).update(userDetails); // set?
    return of(userDetails);
  }

}
