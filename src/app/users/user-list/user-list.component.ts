import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { UserDetails } from '../../models/user.model';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent {

  usersDetails: Observable<UserDetails[]>;

  constructor(
    private userService: UserService,
    private router: Router
  ) {
    this.usersDetails = this.userService.getUsersDetails();
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

