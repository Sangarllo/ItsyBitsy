import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { take, map, tap } from 'rxjs/operators';
import { User } from '../models/user.model';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(
    private auth: AuthService,
    private userSvc: UserService,
    private router: Router) {}

    canActivate(
      next: ActivatedRouteSnapshot,
      state: RouterStateSnapshot
    ): Observable<boolean> {

      return this.auth.user$.pipe(
             take(1),
             map(user => {
               switch (user.uid) {
                 case 'QkwjVEpXnRcQEnyy00aSIO8lHmH3':
                 case 'syhqJPE3P0gkVNNdHiNKuTz0xM72': // TODO by profile
                   return true;
                   break;
                 default:
                   return false;
                   break;
               }
               return false;
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
