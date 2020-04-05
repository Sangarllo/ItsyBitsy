import { UserDetails } from './../../models/user.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-lessons',
  templateUrl: './user-lessons.component.html',
  styleUrls: ['./user-lessons.component.scss']
})
// tslint:disable-next-line: component-class-suffix
export class UserLessonsView implements OnInit {

  userDetails: UserDetails;
  pageTitle = 'Edición de Usuario';
  errorMessage: string;
  nWeek: number = 0;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService) {


      this.nWeek = 0;
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
  }

}
