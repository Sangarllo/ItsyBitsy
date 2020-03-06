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
export class TeacherGuard implements CanActivate {

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
                 case 'qUGCxNLrwmclnCFiRtsQ':
                 case '7dof4dcohxdPAaO1JdvGnDZmo6t2':
                 case 'dmOhvJdkC4PrIhdYO75DYdLNCoA3':
                 case 'mr9ZeGxyBnPfboEiKuHkkq9VjRx1':
                 case 'syhqJPE3P0gkVNNdHiNKuTz0xM72': // TODO by profile
                   return true;

                 default:
                   return false;
               }
             }), // <-- map to boolean
             tap(isTeacher => {
               if (!isTeacher) {
                 console.log('is not teacher');
                 this.router.navigate(['/error-403']);
               }
           })
      );
    }
  }
