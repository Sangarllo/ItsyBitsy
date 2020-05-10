import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { AuthService } from '@app/auth/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent {

    userEmail = new FormControl('');
    constructor(
      private authSvc: AuthService,
      private router: Router) {}

    async onReset() {
      try {
        const email = this.userEmail.value;
        await this.authSvc.resetPassword(email);
        window.alert('Te hemos enviado un email. Revisa tu cuenta de correo electrónico');
        this.router.navigate(['/login']);
      } catch (error) {
        console.log(error);
      }
    }
  }
