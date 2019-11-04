import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User, IUserDetails, Rol, UserDetails } from '../models/user.model'; // optional

import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';

import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { UserService } from './user.service';


const USER_COLLECTION = 'users';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user$: Observable<User>;

  constructor(
      private afAuth: AngularFireAuth,
      private afs: AngularFirestore,
      private userService: UserService,
      private router: Router
  ) {
      // Get the auth state, then fetch the Firestore user document or return null
      this.user$ = this.afAuth.authState.pipe(
        switchMap(user => {
            // Logged in
          if (user) {
            return this.afs.doc<User>(`${USER_COLLECTION}/${user.uid}`).valueChanges();
          } else {
            // Logged out
            return of(null);
          }
        })
      );
  }

  async googleSignin() {
    const provider = new auth.GoogleAuthProvider();
    const credential = await this.afAuth.auth.signInWithPopup(provider);
    return this.updateUserData(credential.user);
  }

  private updateUserData(user) {
    // Sets user data to firestore on login
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(`${USER_COLLECTION}/${user.uid}`);

    const userDetailsRef: AngularFirestoreDocument<UserDetails> = this.afs.doc(`${UserService.USER_DETAILS_COLLECTION}/${user.uid}`);

    // TODO (CHECK)? conditional to create userDetails if first login (register)
    userDetailsRef.get().subscribe(
      (data) => {
      if ( !data.exists) {
          const userDetailsData: IUserDetails = {
            uid: user.uid,
            displayName: user.displayName,
            email: user.email,
            photoURL: user.photoURL,
            nickName: user.displayName.substring(0, user.displayName.indexOf(' ')),
            rol: UserDetails.getRolDefault(),
            creationDate: new Date(),
            // lastDate: null // new Date()
          };

          /* TODO:
          https://app.gitkraken.com/glo/board/XZ4_skfrBQAPXsgV/card/XcCcI1uFhQAPHQuo
          Solventar problema cuando existía ya en UserDetails, y luego hace login/registro
          */
          this.userService.createUserDetails(userDetailsData);
        }
      }
    );

    const userData = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL
    };

    return userRef.set(userData, { merge: true });
  }


  private updateUserData2(user) {
    // Sets user data to firestore on login
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(`${USER_COLLECTION}/${user.uid}`);

    userRef.valueChanges()
      .subscribe( (userFB: User) => {

        let userData;
        if ( userFB == null ) {
          // No existía hasta ahora en BBDD como usuario
          userData = {
            uid: user.uid,
            displayName: user.displayName,
            nickName: user.displayName.substring(0, user.displayName.indexOf(' ')),
            email: user.email,
            photoURL: user.photoURL,
            rol: Rol.Normal,
            creationDate: new Date(),
            lastDate: new Date()
          };
        } else {
          // Ya existe en BBDD como usuario
          userData = {
            lastDate: new Date()
          };
        }

        return userRef.set(userData, { merge: true });
      });
  }

  async signOut() {
    await this.afAuth.auth.signOut();
    this.router.navigate(['/']);
  }
}
