import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '@services/user.service';
import { UserDetails, User } from '@models/user.model';
import Swal from 'sweetalert2';
import { Observable, combineLatest } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Component({
  selector: 'app-users-view',
  templateUrl: './users-view.component.html',
  styleUrls: ['./users-view.component.scss']
})
export class UsersView implements OnInit {

  allAppUsers$: Observable<User[]>;
  allUsers$: Observable<UserDetails[]>;
  allDisabledUsers$: Observable<UserDetails[]>;
  allRegisteredUsers: UserDetails[];
  allStudents$: Observable<UserDetails[]>;
  allTeachers$: Observable<UserDetails[]>;


  constructor(
    private router: Router,
    private userSvc: UserService
  ) {
  }

  ngOnInit() {

    this.allStudents$ = this.userSvc.getAllStudents();
    this.allTeachers$ = this.userSvc.getAllTeachers();
    this.allDisabledUsers$ = this.userSvc.getAllDisabledUsersDetails();
    this.allUsers$ = this.userSvc.getAllUsersDetails();
    this.allAppUsers$ = this.userSvc.getAllUsers();

    this.getRegisteredUsers();
  }

  private getRegisteredUsers() {

    combineLatest([
      this.allAppUsers$,
      this.allUsers$
    ])
      .pipe(
        map(([users, usersDetails]) => users.map(user => ({
          ...user,
          location: usersDetails.find(ud => user.uid === ud.uid)?.location,
        }) as UserDetails)),
      )
      .subscribe((usersDetails: UserDetails[]) => {
        this.allRegisteredUsers = usersDetails;
      });
  }

  gotoNew() {
    this.router.navigate([`${UserDetails.PATH_URL}/0/editar`]);
  }

}
