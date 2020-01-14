import { Component, OnInit, ViewChild, AfterViewInit, ViewChildren, QueryList} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { UserService } from '../../services/user.service';
import { UserDetails } from 'src/app/models/user.model';
import Swal from 'sweetalert2';
import { CoursesService } from '../../services/courses.service';
import { Course } from '../../models/course.model';

@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.scss']
})
export class UsersTableComponent implements OnInit, AfterViewInit {

  columnsToDisplayUsers = ['photoURL', 'displayName', 'location', 'actions'];
  columnsToDisplay = ['photoURL', 'displayName', 'email', 'actions'];
  columnsToDisplayStudents = ['photoURL', 'displayName', 'coursesEnrolled', 'actions'];

  dataSourceAll = new MatTableDataSource();
  dataSourceStudents = new MatTableDataSource();
  dataSourceTeachers = new MatTableDataSource();
  dataSourceAdmins = new MatTableDataSource();
  @ViewChildren(MatPaginator) paginator = new QueryList<MatPaginator>();
  @ViewChildren(MatSort) sort = new QueryList<MatSort>();
  allStudents: UserDetails[] = [];
  courses: Course[] = [];

  constructor(
    private router: Router,
    private userSvc: UserService,
    private courseSvc: CoursesService
  ) { }

  ngOnInit() {
    this.userSvc.getAllUsersDetails().subscribe(
      (users: UserDetails[]) => {
        this.dataSourceAll.data = users;
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

    this.courseSvc.getAllCourses().subscribe(
      (courses: Course[]) => {
        this.courses = courses;
        console.log(`Número de cursos: ${courses.length}`);

        this.userSvc.getAllStudents().subscribe(
          (allStudents: UserDetails[]) => {

            this.allStudents = allStudents;
            this.allStudents.forEach(student => {
              student.coursesEnrolled = this.getCoursesEnrolled(student);
            });
            this.dataSourceStudents.data = allStudents;
        });
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

  private getCoursesEnrolled(student: UserDetails): string {
    let coursesEnrolled: string = '';
    this.courses.forEach( course => {
      course.studentList.forEach( (item: UserDetails) => {
        if ( item.uid === student.uid ) {
          coursesEnrolled += ( coursesEnrolled === '' ) ? course.name : `, ${course.name}`;
        }
      });
    });

    return coursesEnrolled;
  }

}
