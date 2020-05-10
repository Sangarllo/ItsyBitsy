import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth/auth.service';
import { UserDetails, User } from '@models/user.model';
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

  public canAdmin: boolean = false;

  constructor(
    public authSvc: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private dateSvc: DatesService,
    private rateSvc: RateService,
    private userService: UserService
  ) {

  }

  ngOnInit() {

    this.userDetailsId = this.route.snapshot.paramMap.get('id');

    // User info by Id
    if ( this.userDetailsId ) {

      // Watch auth User to scope the visibility
      this.authSvc.user$.subscribe(
        ( user ) => {
          this.canAdmin = user.roles?.includes('ADMIN');
      });

      this.userService.getUserDetails(this.userDetailsId)
      .subscribe( (userDetails: UserDetails) => {

        this.userDetails = userDetails;
        this.pageTitle = `Datos del usuario ${this.userDetails?.displayName}`;
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

  // Info requested about Authenticated User
  private getAuthUser() {
    this.authSvc.user$.subscribe(

      ( user ) => {
        this.userDetailsId = user.uid;
        this.pageTitle = 'Datos de tu Perfil';

        this.canAdmin = true; // user.roles.includes('ADMIN');

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
