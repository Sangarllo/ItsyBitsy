import { Component, Input, OnInit } from '@angular/core';
import { UserDetails } from '../../models/user.model';
import { UserService } from '../../services/user.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.scss']
})
export class UserViewComponent implements OnInit {

  errorMessage: string;

  @Input() userDetailsId: string;
  userDetails: UserDetails;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.userDetailsId = this.route.snapshot.paramMap.get('id');
    this.userService.getUserDetails(this.userDetailsId)
      .subscribe({
          next: userDetails => this.userDetails = userDetails,
          error: err => this.errorMessage = err
      });
  }
}
