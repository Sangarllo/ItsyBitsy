import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User, IUserDetails, Rol, UserDetails } from '../models/user.model'; // optional

import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';

import { Observable, of } from 'rxjs';
import { switchMap, finalize } from 'rxjs/operators';
import { UserService } from './user.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { FileI } from '../models/image.model';


const USER_COLLECTION = 'users';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user$: Observable<User>;
  private filePath: string;

  constructor(
      private afAuth: AngularFireAuth,
      private afs: AngularFirestore,
      private afStorage: AngularFireStorage,
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
            current: true,
            nickName: user.displayName.substring(0, user.displayName.indexOf(' ')),
            isUser: true,
            isAdmin: false,
            isTeacher: false,
            isStudent: false,
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

  async signOut() {
    await this.afAuth.auth.signOut();
    this.router.navigate(['/']);
  }

  preSaveUserProfile(user: IUserDetails, image?: FileI): void {
    if (image) {
      this.uploadImage(user, image);
    } else {
      this.updateUserData(user);
    }
  }


  uploadImage(user: IUserDetails, image: FileI): void {
    this.filePath = `images/${image.name}`;
    const fileRef = this.afStorage.ref(this.filePath);
    const task = this.afStorage.upload(this.filePath, image);
    task.snapshotChanges()
      .pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe(urlImage => {
            user.photoURL = urlImage;
            this.updateUserData(user);
          });
        })
      ).subscribe();
  }
}
