import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  constructor(
    private router: Router,
    public auth: AuthService,
    public afAuth: AngularFireAuth) {}

  public login() {
    this.auth.googleSignin();
  }

  logout() {
    this.afAuth.auth.signOut();
    this.router.navigate([`/home`]);
  }

  public gotoProfile() {
    this.router.navigate([`/usuarios/perfil`]);
  }

  public gotoDashboard() {
    this.router.navigate([`/usuarios/dashboard`]);
  }

}
