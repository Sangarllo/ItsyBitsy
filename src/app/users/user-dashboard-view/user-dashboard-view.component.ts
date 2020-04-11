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


  gotoLessons() {
    // TODO: Implementar
    // this.router.navigate([`/usuarios/${this.userDetailsId}/clases`]);
  }

  gotoAttendances() {
    this.router.navigate([`/usuarios/asistencias`]);
  }


  // 2. TEACHER

  // 2A. Ver mis clases
  gotoMyLessons() {
    // TODO: Si son mis clases, no hace falta cogerlo por parámetro
    this.router.navigate([`/usuarios/${this.userDetailsId}/clases`]);
  }



  // 4. USER

  // 4A. Ver mi perfil
  gotoMyProfile() {
    this.router.navigate([`/perfil`]);
  }


}
