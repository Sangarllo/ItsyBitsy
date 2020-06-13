import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@auth/auth.service';
import { UserService } from '@services/user.service';
import { Course } from '@models/course.model';
import { UserDetails, User } from '@models/user.model';
import { Rate } from '@models/rate';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-user-dashboard-view',
  templateUrl: './user-dashboard-view.component.html',
  styleUrls: ['./user-dashboard-view.component.scss']
})
export class UserDashboardView implements OnInit {

  userId: string;
  userDetails$: Observable<UserDetails>;

  // User Authenticated
  public user$: Observable<User>;

  constructor(
    public authSvc: AuthService,
    private router: Router,
    private userService: UserService
  ) { }

  ngOnInit() {

    this.authSvc.user$.subscribe(

      ( user ) => {
        this.userId = user.uid;
        this.user$ = this.userService.getUser(this.userId);
        this.userDetails$ = this.userService.getUserDetails(this.userId);
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
    this.router.navigate([`/usuarios/${this.userId}/clases`]);
  }


  // 3. STUDENT

  // 3A. Ver mis asistencias
  gotoMyAttendances() {
    this.router.navigate([`/usuarios/${this.userId}/asistencias`]);
  }


  // 4. USER

  // 4A. Ver mi perfil
  gotoMyProfile() {
    this.router.navigate([`/perfil`]);
  }


}
