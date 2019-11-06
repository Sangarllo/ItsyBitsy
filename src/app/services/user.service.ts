import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestoreDocument, AngularFirestore } from '@angular/fire/firestore';
import { IUserDetails, Rol, UserDetails } from '../models/user.model';
import { Observable, of } from 'rxjs';
import { Avatar } from '../models/image.model';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  static USER_DETAILS_COLLECTION = 'user-details';

  private userDetailsCollection: AngularFirestoreCollection<IUserDetails>;
  private userDetailsDoc: AngularFirestoreDocument<IUserDetails>;

  constructor(private afs: AngularFirestore) {
    this.userDetailsCollection = afs.collection<IUserDetails>(UserService.USER_DETAILS_COLLECTION);
  }

  // TODO No implementado
  // getUsersDetails(): {};

  getUserDetails(userId: string): Observable<any> {
    if (userId === '0') {
      return of(this.initialize());
    } else {
      return this.userDetailsCollection.doc(userId).valueChanges();
    }
  }

  createUserDetails(userDetails: IUserDetails): Observable<IUserDetails> {
    if ( userDetails.uid === '0') {
    // If uid is not asigned, we get a GUID (item exists on UserDetails, not in Users)
      userDetails.uid = this.afs.createId();
    }

    console.log(`Creating in UserDatils Database user ${userDetails.uid}`);
    this.userDetailsCollection.doc(userDetails.uid).set(userDetails);
    return of(userDetails);
  }

  updateUserDetails(userDetails: UserDetails): Observable<UserDetails> {
    this.userDetailsDoc = this.userDetailsCollection.doc(userDetails.uid);
    this.userDetailsDoc.update(userDetails);
    return of(userDetails);
  }

  deleteUserDetails(id: string): Observable<{}> {
    this.userDetailsDoc = this.userDetailsCollection.doc(id);
    this.userDetailsDoc.delete();
    return of({});
  }

  private initialize(): IUserDetails {
    // Return an initialized object
    return {
      uid: '0',
      displayName: '',
      photoURL: Avatar.getRandom().path,
      email: '',
      nickName: '',
      rol: Rol.Normal,
      creationDate: new Date()
    };
  }
}

