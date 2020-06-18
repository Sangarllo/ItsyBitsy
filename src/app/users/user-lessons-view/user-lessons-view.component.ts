import { UserDetails, User } from '@models/user.model';
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

  user: User;
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

    this.pageTitle = 'Clases semanales de todos los profesores';

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
            this.user = null;
            this.userDetails = null;
          } else {
            this.getUser(id);
            this.getUserDetails(id);
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
    this.pageTitle = `Clases semanales del profesor ${this.userDetails?.displayName}`;
  }

  onUpdateInterval(fechas: Date[]): void {
    this.dateIni = new Date(fechas[0]);
    this.dateEnd = new Date(fechas[1]);
  }

  gotoDashboard(): void {
    this.router.navigate([`usuarios/dashboard`]);
  }

}
