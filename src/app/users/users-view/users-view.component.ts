import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { UserDetails } from 'src/app/models/user.model';
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

  viewUser(userDetails: UserDetails) {
    this.router.navigate([`${UserDetails.PATH_URL}/${userDetails.uid}`]);
  }

  editUser(userDetails: UserDetails) {
    this.router.navigate([`${UserDetails.PATH_URL}/${userDetails.uid}/editar`]);
  }

  deleteUser(userDetails: UserDetails) {
    Swal.fire({
      title: '¿Estás seguro?',
      // tslint:disable-next-line:max-line-length
      text: `Si pulsas OK, el usuario ${userDetails.displayName} quedará eliminado de la base de datos (tanto si es estudiante, como profesor o administrador) y no podrás revertir dicha acción`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, ¡bórralo!'
    }).then((result) => {
      if (result.value) {

        userDetails.current = false;
        this.userSvc.updateUserDetails(userDetails)
        .subscribe({
          next: () => {
            Swal.fire(
              'Borrado!',
              `El usuario ${userDetails.displayName} ha sido eliminado.`,
              'success'
            );
          },
          error: err => {
            Swal.fire(
              'Ups!',
              `El usuario ${userDetails.displayName} no ha podido ser eliminado.`,
              'error'
            );
          },
        });

      }
    });
  }

}
