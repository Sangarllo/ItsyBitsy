import { UserDetails } from './../../models/user.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-attendances-report-view',
  templateUrl: './user-attendances-report-view.component.html',
  styleUrls: ['./user-attendances-report-view.component.scss']
})
// tslint:disable-next-line: component-class-suffix
export class UserAttendancesReportView implements OnInit {

  userDetails: UserDetails;
  pageTitle: string = `Informe de Asistencias del mes`;
  errorMessage: string;

  date: Date;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
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
          } else {
            this.getUserDetails(id);
          }
        }
    );
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
  }

  gotoDashboard(): void {
    this.router.navigate([`usuarios/dashboard`]);
  }

}