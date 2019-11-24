import { Component, Input } from '@angular/core';
import { UserDetails } from 'src/app/models/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'sh-user-list',
  templateUrl: './sh-user-list.component.html',
  styleUrls: ['./sh-user-list.component.scss']
})
export class ShUserListComponent {

  @Input() userList: UserDetails[];

  constructor(
    private router: Router,
  ) { }

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
}
