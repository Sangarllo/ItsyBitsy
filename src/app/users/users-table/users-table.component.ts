import { Component, OnInit, ViewChild, AfterViewInit, ViewChildren, QueryList} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { UserService } from '../../services/user.service';
import { UserDetails } from 'src/app/models/user.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.scss']
})
export class UsersTableComponent implements OnInit, AfterViewInit {

  columnsToDisplay = ['photoURL', 'displayName', 'email', 'actions'];

  dataSourceAll = new MatTableDataSource();
  dataSourceStudents = new MatTableDataSource();
  dataSourceTeachers = new MatTableDataSource();
  dataSourceAdmins = new MatTableDataSource();
  @ViewChildren(MatPaginator) paginator = new QueryList<MatPaginator>();
  @ViewChildren(MatSort) sort = new QueryList<MatSort>();

  constructor(
    private router: Router,
    private userSvc: UserService
  ) { }

  ngOnInit() {
    this.userSvc.getAllUsersDetails().subscribe(
      (users: UserDetails[]) => {
        this.dataSourceAll.data = users;
    });

    this.userSvc.getAllStudents().subscribe(
      (users: UserDetails[]) => {
        this.dataSourceStudents.data = users;
    });

    this.userSvc.getAllTeachers().subscribe(
      (users: UserDetails[]) => {
        this.dataSourceTeachers.data = users;
    });

    this.userSvc.getAllAdmins().subscribe(
      (users: UserDetails[]) => {
        this.dataSourceAdmins.data = users;
        console.log(`Número de administradores: ${users.length}`);
    });
  }

  ngAfterViewInit(): void {
    this.dataSourceAll.paginator = this.paginator.toArray()[0];
    this.dataSourceAll.sort = this.sort.toArray()[0];
    this.dataSourceStudents.paginator = this.paginator.toArray()[1];
    this.dataSourceStudents.sort = this.sort.toArray()[1];
    this.dataSourceTeachers.paginator = this.paginator.toArray()[2];
    this.dataSourceTeachers.sort = this.sort.toArray()[2];
    this.dataSourceAdmins.paginator = this.paginator.toArray()[3];
    this.dataSourceAdmins.sort = this.sort.toArray()[3];
  }

  applyFilterAll(filterValue: string) {
    this.dataSourceAll.filter = filterValue.trim().toLowerCase();
    if (this.dataSourceAll.paginator) {
      this.dataSourceAll.paginator.firstPage();
    }
  }

  applyFilterStudents(filterValue: string) {
    this.dataSourceStudents.filter = filterValue.trim().toLowerCase();
    if (this.dataSourceStudents.paginator) {
      this.dataSourceStudents.paginator.firstPage();
    }
  }

  applyFilterTeachers(filterValue: string) {
    this.dataSourceTeachers.filter = filterValue.trim().toLowerCase();
    if (this.dataSourceTeachers.paginator) {
      this.dataSourceTeachers.paginator.firstPage();
    }
  }

  applyFilterAdmins(filterValue: string) {
    this.dataSourceAdmins.filter = filterValue.trim().toLowerCase();
    if (this.dataSourceAdmins.paginator) {
      this.dataSourceAdmins.paginator.firstPage();
    }
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

  /*
      TODO: De momento lo tenemos deshabilitado, ¿tiene sentido borrar
      un usuario? ¿desde dónde hay que borrarlo? Si lo borramos en la
      tabla de profesor, ¿no quedará borrado del todo?
  */
  deleteUser(userDetails: UserDetails) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: `Si pulsas OK, el usuario ${userDetails.displayName} quedará eliminado y no podrás revertir dicha acción`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, ¡bórralo!'
    }).then((result) => {
      if (result.value) {
        Swal.fire(
          'Borrado!',
          `El usuario ${userDetails.displayName} ha sido eliminado.`,
          'success'
        );
      }
    });
  }

}
