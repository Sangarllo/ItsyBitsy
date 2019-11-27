import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { UserDetails } from '../../models/user.model';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

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

  constructor(
    public auth: AuthService,
    private router: Router,
    private userService: UserService
  ) { }

  ngOnInit() {

    this.auth.user$.subscribe(

      ( user ) => {
        this.userDetailsId = user.uid;
        this.userService.getUserDetails(this.userDetailsId)
        .subscribe({
          next: userDetails => this.userDetails = userDetails,
          error: err => this.errorMessage = err
        });
      }

    );
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
