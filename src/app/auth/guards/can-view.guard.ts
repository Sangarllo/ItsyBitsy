import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '@app/auth/auth.service';
import { take, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CanViewGuard implements CanActivate {

  constructor(private authSvc: AuthService, private router: Router) {}

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    return this.authSvc.user$.pipe(
      take(1),
      map(user => !!user), // <-- map to boolean
      tap((loggedIn) => {
        if (!loggedIn) {
          window.alert('Acceso denegado. No estás registrado');
          this.router.navigate(['/error-401']);
        }
      })
    );
  }
}

