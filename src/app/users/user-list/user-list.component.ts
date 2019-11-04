import { Component } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { IUserDetails, UserDetails } from '../../models/user.model';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent {

  private userDetailsCollection: AngularFirestoreCollection<UserDetails>;
  usersDetails: Observable<UserDetails[]>;

  constructor( afs: AngularFirestore, private router: Router) {
    this.userDetailsCollection = afs.collection<UserDetails>('user-details');
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

  gotoUserDetails(userDetails) {
    console.log(`goto ${userDetails.id}`);
    this.router.navigate([`${UserDetails.PATH_URL}/${userDetails.id}`]);
  }

  gotoNew() {
    this.router.navigate([`${UserDetails.PATH_URL}/0/editar`]);
  }

}

