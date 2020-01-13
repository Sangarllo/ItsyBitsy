import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestoreDocument, AngularFirestore } from '@angular/fire/firestore';
import { IUserDetails, UserDetails, PaymentMethod } from '../models/user.model';
import { Observable, of } from 'rxjs';
import { Avatar } from '../models/image.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  static USER_DETAILS_COLLECTION = 'user-details';

  private userDetailsCollection: AngularFirestoreCollection<IUserDetails>;
  private studentsCollection: AngularFirestoreCollection<IUserDetails>;
  private teachersCollection: AngularFirestoreCollection<IUserDetails>;
  private adminsCollection: AngularFirestoreCollection<IUserDetails>;
  private userDetailsDoc: AngularFirestoreDocument<IUserDetails>;

  constructor(
    private afs: AngularFirestore,
  ) {
    this.userDetailsCollection = this.afs.collection<UserDetails>(UserService.USER_DETAILS_COLLECTION);
  }

  getAllUsersDetails(): Observable<UserDetails[]> {

    this.userDetailsCollection = this.afs.collection<UserDetails>(
        UserService.USER_DETAILS_COLLECTION,
        ref => ref.where('current', '==', true)
                  .orderBy('displayName')
    );

    return this.userDetailsCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as UserDetails;
        const id = a.payload.doc.id;
        return { id, ...data };
      })
      )
    );
  }

  getAllStudents(): Observable<UserDetails[]> {

    this.studentsCollection = this.afs.collection(
      UserService.USER_DETAILS_COLLECTION,
      ref => ref.where('isStudent', '==', true)
                .where('current', '==', true)
                .orderBy('displayName')
    );

    return this.studentsCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as UserDetails;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
  }

  getAllTeachers(): Observable<UserDetails[]> {

    this.teachersCollection = this.afs.collection(
      UserService.USER_DETAILS_COLLECTION,
      ref => ref.where('isTeacher', '==', true)
                .where('current', '==', true)
                .orderBy('displayName')
      );

    return this.teachersCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as UserDetails;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
  }


  getAllAdmins(): Observable<UserDetails[]> {

    this.adminsCollection = this.afs.collection(
      UserService.USER_DETAILS_COLLECTION,
      ref => ref.where('isAdmin', '==', true).orderBy('displayName')
    );

    return this.adminsCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as UserDetails;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
  }


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

  public initialize(): UserDetails {
    // Return an initialized object
    return {
      uid: '0',
      displayName: '',
      photoURL: Avatar.getRandom().path,
      email: '',
      current: true,
      nickName: '',
      birthday: new Date(),
      location: 'Rincón de Soto',
      creationDate: new Date(),
      isUser: false,
      isAdmin: false,
      isTeacher: false,
      isStudent: false,
      rateId: 'no-aplica',
      telephone: '',
      contactPerson: '-',
      paymentMethod: PaymentMethod.NoAplica
    };
  }
}

