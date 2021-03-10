import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { take, map, tap } from 'rxjs/operators';
import { User } from '@models/user.model';
import { AuthService } from '@auth/auth.service';
import { UserService } from '@services/user.service';

@Injectable({
  providedIn: 'root'
})
export class TeacherAdminGuard implements CanActivate {

  constructor(
    private auth: AuthService,
    private router: Router) {}

    canActivate(): Observable<boolean> {

      return this.auth.user$.pipe(
             take(1),
             map(user => {
               switch (user.uid) {
                 case 'QkwjVEpXnRcQEnyy00aSIO8lHmH3':
                 case 'ZPF6sd4qDRa5Kjc0fhHSyOBF14S2':
                 case 'qUGCxNLrwmclnCFiRtsQ':
                 case 'syhqJPE3P0gkVNNdHiNKuTz0xM72':
                 case 'QkwjVEpXnRcQEnyy00aSIO8lHmH3':
                 case 'cNS7AELLwOdX4WKFiGngUSjz7472':
                 case 'qUGCxNLrwmclnCFiRtsQ':
                 case '7dof4dcohxdPAaO1JdvGnDZmo6t2':
                 case 'dmOhvJdkC4PrIhdYO75DYdLNCoA3':
                 case 'mr9ZeGxyBnPfboEiKuHkkq9VjRx1':
                 case 'Ks9Ukg0QE7R2sMV3FUEm25RcHWm1': // Usuario ItsyBitsy
                 case 'syhqJPE3P0gkVNNdHiNKuTz0xM72': // TODO by profile
                   return true;

                 default:
                   return false;
               }
             }), // <-- map to boolean
             tap(isTeacher => {
               if (!isTeacher) {
                 console.log('is not admin or teacher');
                 this.router.navigate(['/error-403']);
               }
           })
      );
    }
  }
