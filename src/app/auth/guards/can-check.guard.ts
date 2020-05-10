import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '@auth/auth.service';
import { take, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CanCheckGuard implements CanActivate {

  constructor(private authSvc: AuthService) {}

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    return this.authSvc.user$.pipe(
      take(1),
      map((user) => user && ( this.authSvc.isTeacher(user) || this.authSvc.isAdmin(user) )),
      tap((canCheck) => {
        if (!canCheck) {
          window.alert('Acceso denegado. Debes ser profesor o administrador para acceder');
        }
      })
    );
  }
}
