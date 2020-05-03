import { UserDetails } from '@models/user.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '@services/user.service';
import { DatesService } from '@services/dates.service';

@Component({
  selector: 'app-user-lessons-view',
  templateUrl: './user-lessons-view.component.html',
  styleUrls: ['./user-lessons-view.component.scss']
})
export class UserLessonsView implements OnInit {

  userDetails: UserDetails;
  pageTitle: string;
  errorMessage: string;

  dateIni: Date;
  dateEnd: Date;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dateSvc: DatesService,
    private userService: UserService) {

    this.pageTitle = 'Clases semanales de los profesores';

    // Fechas que limitan la semana
    this.dateIni = this.dateSvc.getWeekMonday();
    this.dateEnd = this.dateSvc.getWeekFriday();
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
    this.pageTitle = `Clases del profesor ${this.userDetails?.displayName}`;
  }

  onUpdateInterval(fechas: Date[]): void {
    this.dateIni = new Date(fechas[0]);
    this.dateEnd = new Date(fechas[1]);
  }

  gotoDashboard(): void {
    this.router.navigate([`usuarios/dashboard`]);
  }

}
