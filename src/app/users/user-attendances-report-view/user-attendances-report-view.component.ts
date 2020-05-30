import { UserDetails, User } from '@models/user.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '@services/user.service';
import { DatesService } from '@services/dates.service';

@Component({
  selector: 'app-user-attendances-report-view',
  templateUrl: './user-attendances-report-view.component.html',
  styleUrls: ['./user-attendances-report-view.component.scss']
})
export class UserAttendancesReportView implements OnInit {

  user: User;
  userDetails: UserDetails;
  pageTitle: string = '';
  errorMessage: string;

  date: Date;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private datesSvc: DatesService,
    private userService: UserService) {

    // Primer día del mes
    const today = new Date();
    this.date = new Date( today.getFullYear(), today.getMonth(), 1 );
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
          this.displayUserDetails();
        },
        error: err => this.errorMessage = err
      });
  }

  displayUserDetails(): void {
    this.pageTitle = `Informe de asistencias del estudiante ${this.userDetails.displayName}`;
  }

  onUpdateMonth(newDate: Date): void {
    this.date = new Date(newDate);

    const month = this.datesSvc.MONTH_NAMES[this.date.getMonth()];
    const year = this.date.getFullYear();

    this.pageTitle = `Informe de asistencias de ${month} de ${year}`;
  }

  gotoDashboard(): void {
    this.router.navigate([`usuarios/dashboard`]);
  }

}
