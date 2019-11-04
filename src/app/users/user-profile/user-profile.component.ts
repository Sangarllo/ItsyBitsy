import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { UserDetails } from '../../models/user.model';
import { UserService } from '../../services/user.service';

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
}
