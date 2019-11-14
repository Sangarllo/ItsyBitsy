import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { UserDetails } from '../../models/user.model';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.scss']
})
export class StudentListComponent {

  private userDetailsCollection: AngularFirestoreCollection<UserDetails>;
  usersDetails: Observable<UserDetails[]>;

  constructor(
    afs: AngularFirestore,
    private router: Router,
    private userService: UserService
  ) {

    this.userDetailsCollection = afs.collection(
      UserService.USER_DETAILS_COLLECTION,
      ref => ref.where('isStudent', '==', true)
    );

    this.usersDetails = this.userDetailsCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as UserDetails;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
  }

  applyStyles(userDetails: UserDetails) {
    const styles = {
      'background-image': `url("${userDetails.photoURL}")`,
      'background-size': 'cover'
    };
    return styles;
  }

  gotoUserDetails(userDetails: UserDetails) {
    console.log(`goto ${userDetails.uid}`);
    this.router.navigate([`${UserDetails.PATH_URL}/${userDetails.uid}`]);
  }

  gotoNew() {
    this.router.navigate([`${UserDetails.PATH_URL}/0/editar`]);
  }

}
