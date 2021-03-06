import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import moment from 'moment';
import { UserDetails, User } from '@models/user.model';
import { UserService } from '@services/user.service';
import { DatesService } from '@services/dates.service';

@Component({
  selector: 'app-user-attendances-view',
  templateUrl: './user-attendances-view.component.html',
  styleUrls: ['./user-attendances-view.component.scss']
})
export class UserAttendancesView implements OnInit {

  user: User;
  userDetails: UserDetails;
  pageTitle: string = '';
  errorMessage: string;

  date: Date;
  month: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService) {

      moment.locale('es');

      // Primer día del mes
      const today = new Date();
      this.date = new Date( today.getFullYear(), today.getMonth(), 1 );
      this.month = moment(this.date).format('MMMM [de] YYYY');
  }

  ngOnInit(): void {

      // Read the student Id from the route parameter
      this.route.paramMap.subscribe(
        params => {
          const id = params.get('id');
          if ( id === 'all' ) {
            this.userDetails = null;
            this.user = null;
          } else {
            this.getUserDetails(id);
            this.getUser(id);
          }
        }
    );
  }

  getUser(id: string): void {
    this.userService.getUser(id)
      .subscribe({
        next: (user: User) => {
          this.user = user;
        },
        error: err => this.errorMessage = err
      });
  }

  getUserDetails(id: string): void {
    this.userService.getUserDetails(id)
      .subscribe({
        next: (userDetails: UserDetails) => {
          this.userDetails = userDetails;
          this.displayTitle();
        },
        error: err => this.errorMessage = err
      });
  }

  displayTitle(): void {
    this.pageTitle = ( this.userDetails ) ?
      `Listado de asistencias de ${this.userDetails.displayName} de ${this.month}` :
      `Listado de asistencias de ${this.month}`;
  }

  onUpdateMonth(newDate: Date): void {
    this.date = new Date(newDate);

    this.month = moment(this.date).format('MMMM [de] YYYY');
    this.displayTitle();
  }

  gotoDashboard(): void {
    this.router.navigate([`usuarios/dashboard`]);
  }

}
