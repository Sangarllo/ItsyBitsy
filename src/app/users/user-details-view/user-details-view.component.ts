import { Component, OnInit } from '@angular/core';
import { AuthService } from '@services/auth.service';
import { UserDetails } from '@models/user.model';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '@services/user.service';
import { DatesService } from '@services/dates.service';
import { RateService } from '@services/rates.service';
import { Rate } from '@models/rate';


@Component({
  selector: 'app-user-details-view',
  templateUrl: './user-details-view.component.html',
  styleUrls: ['./user-details-view.component.scss']
})
export class UserDetailsView implements OnInit {

  pageTitle = 'Detalles del Usuario';
  errorMessage: string;

  userDetailsId: string;
  userDetails: UserDetails;
  rateName: string;

  constructor(
    public auth: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private dateSvc: DatesService,
    private rateSvc: RateService,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.userDetailsId = this.route.snapshot.paramMap.get('id');

    if ( this.userDetailsId ) {

      this.userService.getUserDetails(this.userDetailsId)
      .subscribe( (userDetails: UserDetails) => {
        this.userDetails = userDetails;
        this.pageTitle = `Datos del usuario ${this.userDetails.displayName}`;
        this.userDetails.birthday = ( userDetails?.birthday ) ?
          this.dateSvc.fromFirebaseDate(userDetails?.birthday) :
          null;

        this.getRate();
      });

    } else {
      this.getAuthUser();
    }
  }

  private getRate() {
    this.rateSvc.getRate(this.userDetails.rateId)
      .subscribe( (rate: Rate) => {
        this.rateName = rate.name;
      });
  }

  private getAuthUser() {
    this.auth.user$.subscribe(

      ( user ) => {
        this.userDetailsId = user.uid;
        this.pageTitle = 'Datos de tu Perfil';

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

  gotoEdition() {
    this.router.navigate([`/${UserDetails.PATH_URL}/${this.userDetailsId}/editar`]);
  }

  gotoDashboard() {
    this.router.navigate([`/usuarios/dashboard`]);
  }
}
