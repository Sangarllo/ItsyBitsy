import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { Course } from 'src/app/models/course.model';
import { UserDetails } from '../../models/user.model';
import { Rate } from '../../models/rate';

@Component({
  selector: 'app-user-dashboard-view',
  templateUrl: './user-dashboard-view.component.html',
  styleUrls: ['./user-dashboard-view.component.scss']
})
// tslint:disable-next-line: component-class-suffix
export class UserDashboardView implements OnInit {

  pageTitle: string;
  userDetailsId: string;
  userDetails: UserDetails;

  constructor(
    public auth: AuthService,
    private router: Router,
    private userService: UserService
  ) { }

  ngOnInit() {

    this.auth.user$.subscribe(

      ( user ) => {
        this.userDetailsId = user.uid;

        this.userService.getUserDetails(this.userDetailsId)
        .subscribe( (userDetails: UserDetails) => {
          this.userDetails = userDetails;
          this.pageTitle = `Panel de opciones de ${this.userDetails.displayName}`;
        });
        }
    );
  }

  // 1. ADMIN

  // 1A. Ver todas las personas
  gotoUsersList() {
    this.router.navigate([`/${UserDetails.PATH_URL}`]);
  }

  // 1B. Ver todos los cursos
  gotoCoursesList() {
    this.router.navigate([`/${Course.PATH_URL}`]);
  }

  // 1C. Ver todas las tarifas
  gotoRates() {
    this.router.navigate([`/${Rate.PATH_URL}`]);
  }

  // 1D. Ver todas las clases de profesores
  gotoAllLessons() {
    this.router.navigate([`/usuarios/all/clases`]);
  }

  // 1E. Ver todas las asistencias de estudiantes
  gotoAllAttendances() {
    this.router.navigate([`/usuarios/all/asistencias`]);
  }

  // 1F. Ver el informe de todas las asistencias de estudiantes
  gotoAllAttendancesReport() {
    this.router.navigate([`/usuarios/all/resumen-asistencias`]);
  }

  // 1G. Ver el tablero de configuración de cursos
  gotoCoursesDashboard() {
    this.router.navigate([`/cursos/dashboard`]);
  }


  // 2. TEACHER

  // 2A. Ver mis clases
  gotoMyLessons() {
    this.router.navigate([`/usuarios/${this.userDetailsId}/clases`]);
  }


  // 3. STUDENT

  // 3A. Ver mis asistencias
  gotoMyAttendances() {
    this.router.navigate([`/usuarios/${this.userDetailsId}/asistencias`]);
  }


  // 4. USER

  // 4A. Ver mi perfil
  gotoMyProfile() {
    this.router.navigate([`/perfil`]);
  }


}
