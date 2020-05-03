import { Component, OnInit } from '@angular/core';
import { AuthService } from '@services/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { User } from '@models/user.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  public user$: Observable<any> = this.authSvc.afAuth.user;

  constructor(
    private router: Router,
    public authSvc: AuthService,
    public afAuth: AngularFireAuth) {}

  public onLogin() {
    this.router.navigate([`/login`]);
    // this.authSvc.googleSignin()
    //   .then(() => {
    //     this.gotoProfile();
    //   });
  }

  async onLogout() {
    try {
      await this.authSvc.signOut();
    } catch (error) {
      console.log(error);
    }
  }

  public gotoProfile() {
    this.router.navigate([`/usuarios/perfil`]);
  }

  public gotoDashboard() {
    this.router.navigate([`/usuarios/dashboard`]);
  }

}
