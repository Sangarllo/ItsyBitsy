import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '@auth/auth.service';
import { take, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CanAdminGuard implements CanActivate {

  constructor(private authSvc: AuthService, private router: Router) {}

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    return this.authSvc.user$.pipe(
      take(1),
      map((user) => user && this.authSvc.isAdmin(user)),
      tap((canEdit) => {
        if (!canEdit) {
          window.alert('Acceso denegado. Debes ser administrador para acceder');
          this.router.navigate(['/error-403']);
        }
      })
    );
  }
}
