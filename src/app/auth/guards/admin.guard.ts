import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { take, map, tap } from 'rxjs/operators';
import { User } from '@models/user.model';
import { AuthService } from '@auth/auth.service';
import { UserService } from '@services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(
    private auth: AuthService,
    private userSvc: UserService,
    private router: Router) {}

    canActivate(): Observable<boolean> {

      return this.auth.user$.pipe(
             take(1),
             map(user => {
               switch (user.uid) {
                 case 'QkwjVEpXnRcQEnyy00aSIO8lHmH3':
                 case 'ZPF6sd4qDRa5Kjc0fhHSyOBF14S2':
                 case 'qUGCxNLrwmclnCFiRtsQ':
                 case 'syhqJPE3P0gkVNNdHiNKuTz0xM72': // TODO by profile
                   return true;

                 default:
                   return false;
               }
             }), // <-- map to boolean
             tap(isAdmin => {
               if (!isAdmin) {
                 console.log('is not admin');
                 this.router.navigate(['/error-403']);
               }
           })
      );
    }
  }
