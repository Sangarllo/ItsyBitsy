import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { UserDetails } from '../../models/user.model';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.scss']
})
export class StudentListComponent {

  usersDetails: Observable<UserDetails[]>;

  constructor(
    private userService: UserService,
    private router: Router,
  ) {
    this.usersDetails = this.userService.getAllStudents();
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
