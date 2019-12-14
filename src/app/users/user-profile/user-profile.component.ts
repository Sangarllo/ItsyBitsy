import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { UserDetails } from '../../models/user.model';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { DatesService } from '../../services/dates.service';
import { RateService } from '../../services/rates.service';
import { Rate } from 'src/app/models/rate';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  pageTitle = 'Detalles del Usuario';
  errorMessage: string;

  userDetailsId: string;
  userDetails: UserDetails;
  rateName: string;

  constructor(
    public auth: AuthService,
    private router: Router,
    private dateSvc: DatesService,
    private rateSvc: RateService,
    private userService: UserService
  ) { }

  ngOnInit() {

    this.auth.user$.subscribe(

      ( user ) => {
        this.userDetailsId = user.uid;

        this.userService.getUserDetails(this.userDetailsId)
        .subscribe( (userDetails: UserDetails) => {
          this.userDetails = userDetails;

          if ( this.userDetails.birthday ) {
            this.userDetails.birthday = this.dateSvc.fromFirebaseDate(this.userDetails.birthday);
          }

          if ( this.userDetails.rateId ) {
            this.getRate();
          }

        });
        }
    );
  }

  getRate() {
    this.rateSvc.getRate(this.userDetails.rateId)
      .subscribe( (rate: Rate) => {
        this.rateName = rate.name;
      });
  }

  applyStyles(userDetails: UserDetails) {
    const styles = {
      'background-image': `url("assets/section/user-icon.png")`,
      'background-size': 'cover'
    };
    return styles;
  }

  gotoEdition() {
    this.router.navigate([`/${UserDetails.PATH_URL}/${this.userDetailsId}/editar`]);
  }

  gotoDashboard() {
    this.router.navigate([`/usuarios/dashboard`]);
  }
}
