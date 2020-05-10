import { User, IUserDetails, UserDetails } from '@models/user.model'; // optional
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';

import { Observable, of } from 'rxjs';
import { switchMap, finalize } from 'rxjs/operators';
import { UserService } from './user.service';
import { FileI } from '@models/image.model';
import { RoleValidator } from '@auth/helpers/roleValidator';
import Swal from 'sweetalert2';

export enum ErrorAuth {
  USER_NO_REGISTERED = 'USUARIO NO REGISTRADO',
}

const USER_COLLECTION = 'users';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends RoleValidator {

  user$: Observable<User>;
  private filePath: string;

  constructor(
      public afAuth: AngularFireAuth,
      private afs: AngularFirestore,
      private afStorage: AngularFireStorage,
      private userService: UserService,
      private router: Router
  ) {
      super(); // Get the behaviour of RoleValidator

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

  async resetPassword(email: string): Promise<void> {
    try {
      return this.afAuth.sendPasswordResetEmail(email);
    } catch (error) {
      console.log(error);
    }
  }

  async sendVerificationEmail(): Promise<void> {
    return (await this.afAuth.currentUser).sendEmailVerification();
  }

  async loginWithEmailAndPassword(email: string, password: string): Promise<User> {
    try {
      const {user} = await this.afAuth.signInWithEmailAndPassword(
        email,
        password
      );
      this.updateUserData(user); // TODO: Ojo! no siempre
      return user;
    } catch (error) {
      this.manageError(error.toString());
    }
  }

  async registerWithEmailAndPassword(email: string, password: string): Promise<User> {
    try {
      const {user} = await this.afAuth.createUserWithEmailAndPassword(
        email,
        password
      );
      this.sendVerificationEmail();
      return user;
    } catch (error) {
      console.log(`Error durante el registro: ${error}`);
    }
  }

  async loginGoogle(): Promise<User> {
    try {
      const { user } = await this.afAuth.signInWithPopup(
        new auth.GoogleAuthProvider()
      );
      this.updateUserData(user);
      return user;
    } catch (error) {
      console.log(`Error durante el login con Google: ${error}`);
    }
  }

  private updateUserData(user: User) {
    // Sets user data to firestore on login
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(`${USER_COLLECTION}/${user.uid}`);
    const userDetailsRef: AngularFirestoreDocument<UserDetails> = this.afs.doc(`${UserService.USER_DETAILS_COLLECTION}/${user.uid}`);

    // TODO (CHECK)? conditional to create userDetails if first login (register)
    userDetailsRef.get().subscribe(
      (data: any) => {
      if ( !data.exists) {
          const userDetailsData: IUserDetails = {
            uid: user.uid,
            email: user.email,
            emailVerified: user.emailVerified,
            displayName: user.displayName,
            photoURL: user.photoURL,
            current: true,
            nickName: (user.displayName) ?
              user.displayName.substring(0, user.displayName.indexOf(' ')) :
              user.email,
            isUser: true,
            isAdmin: false,
            isTeacher: false,
            isStudent: false,
            creationDate: new Date(),
            // lastDate: null // new Date()
          };

          // TODO: https://app.gitkraken.com/glo/board/XZ4_skfrBQAPXsgV/card/XcCcI1uFhQAPHQuo
          // Solventar problema cuando existía ya en UserDetails, y luego hace login/registro
          this.userService.createUserDetails(userDetailsData);
        }
      }
    );

    const data: User = {
      uid: user.uid,
      email: user.email,
      emailVerified: user.emailVerified,
      displayName: user.displayName,
      photoURL: user.photoURL,
      roles: user.roles ?? []
    };

    console.log(`Vamos a guardar los datos de ${JSON.stringify(data)}`);

    return userRef.set(data, { merge: true });
  }


  async signOut() {
    await this.afAuth.signOut();
    this.router.navigate(['/login']);
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

  private manageError(errorStr: string) {

    if ( errorStr.includes('There is no user record corresponding to this identifier.') ) {

      Swal.fire({
        icon: 'warning',
        title: 'Error durante el acceso',
        html: `No existe un registro asociado a este email. Para acceder a esta aplicación, es preciso estar registrado.`,
        footer: `<a href='register'>Pulsa aquí para ir al registro</a>`
      });

    } else {

      Swal.fire({
        icon: 'warning',
        title: 'Error durante el acceso',
        /*
        html: `Ha habido problemas al acceder con el email <b>${email}</b>.`,
        footer: `<a href='register'>Pulsa aquí para ir al registro</a>`
        */
      });
    }
  }
}
