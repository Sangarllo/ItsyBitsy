import { UserDetails } from './../../models/user.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-lessons',
  templateUrl: './user-lessons.component.html',
  styleUrls: ['./user-lessons.component.scss']
})
// tslint:disable-next-line: component-class-suffix
export class UserLessonsView implements OnInit {

  userDetails: UserDetails;
  pageTitle: string;
  errorMessage: string;

  dateIni: Date;
  dateEnd: Date;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService) {

    // Lunes anterior
    this.dateIni = new Date();
    this.dateIni.setDate(this.dateIni.getDate() - (this.dateIni.getDay() + 6) % 7);

    // Lunes próximo
    this.dateEnd = new Date();
    this.dateEnd.setDate(this.dateIni.getDate() + 4);
  }

  ngOnInit(): void {

      // Read the student Id from the route parameter
      this.route.paramMap.subscribe(
        params => {
          const id = params.get('id');
          this.getUserDetails(id);
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
    this.pageTitle = `Clases del profesor ${this.userDetails.displayName}`;
  }

  onUpdateInterval(fechas: Date[]): void {
    this.dateIni = new Date(fechas[0]);
    this.dateEnd = new Date(fechas[1]);
  }

  gotoDashboard(): void {
    this.router.navigate([`usuarios/dashboard`]);
  }

}
