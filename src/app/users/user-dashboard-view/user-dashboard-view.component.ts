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

  gotoUsersList() {
    this.router.navigate([`/${UserDetails.PATH_URL}`]);
  }

  gotoCoursesList() {
    this.router.navigate([`/${Course.PATH_URL}`]);
  }

  gotoRates() {
    this.router.navigate([`/${Rate.PATH_URL}`]);
  }

  gotoAllLessons() {
    this.router.navigate([`/usuarios/all/clases`]);
  }

  gotoLessonsAudit() {
    this.router.navigate([`/cursos/audit/100`]);
  }

  gotoAllComments() {
    this.router.navigate([`/usuarios/all/comentarios`]);
  }

  gotoAllAttendancesReport() {
    this.router.navigate([`/usuarios/all/resumen-asistencias`]);
  }

  gotoAttendancesDashboard() {
    this.router.navigate([`/usuarios/asistencias-dashboard`]);
  }

  gotoCoursesDashboard() {
    this.router.navigate([`/cursos/dashboard`]);
  }

  gotoMyLessons() {
    this.router.navigate([`/usuarios/${this.userId}/clases`]);
  }

  gotoMyAttendances() {
    this.router.navigate([`/usuarios/${this.userId}/asistencias`]);
  }

  gotoMyProfile() {
    this.router.navigate([`/perfil`]);
  }
}
