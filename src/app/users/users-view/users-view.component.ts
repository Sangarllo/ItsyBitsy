import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '@services/user.service';
import { UserDetails } from '@models/user.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-users-view',
  templateUrl: './users-view.component.html',
  styleUrls: ['./users-view.component.scss']
})
export class UsersView implements OnInit {

  allUsers: UserDetails[];
  students: UserDetails[];
  teachers: UserDetails[];
  admins: UserDetails[];

  constructor(
    private router: Router,
    private userSvc: UserService
  ) { }

  ngOnInit() {
    this.userSvc.getAllUsersDetails().subscribe(
      (users: UserDetails[]) => {
        console.log(`Número de usuarios: ${users.length}`);
        this.allUsers = users;
        this.students = users.filter( u => u.isStudent );
        this.teachers = users.filter( u => u.isTeacher );
        this.admins = users.filter( u => u.isAdmin );
    });
  }

  gotoNew() {
    this.router.navigate([`${UserDetails.PATH_URL}/0/editar`]);
  }

}
