import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { UserDetails } from '../../models/user.model';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { DatesService } from '../../services/dates.service';
import { RateService } from '../../services/rates.service';
import { Rate } from 'src/app/models/rate';


@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {

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
    this.userService.getUserDetails(this.userDetailsId)
      .subscribe( (userDetails: UserDetails) => {
        this.userDetails = userDetails;
        this.userDetails.birthday = this.dateSvc.fromFirebaseDate(this.userDetails.birthday);

        this.getRate();

      });
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
}
