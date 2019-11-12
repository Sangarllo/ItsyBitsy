import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { UserDetails } from '../../models/user.model';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { Teacher } from 'src/app/models/teacher.model';
import { Student } from 'src/app/models/student.model';


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

  constructor(
    public auth: AuthService,
    private route: ActivatedRoute,
    private router: Router,
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

  gotoUserEdition() {
    this.router.navigate([`/${UserDetails.PATH_URL}/${this.userDetailsId}/editar`]);
  }

  gotoTeacherEdition() {
    this.router.navigate([`/${Teacher.PATH_URL}/${this.userDetailsId}/editar`]);
  }

  gotoStudentEdition() {
    this.router.navigate([`/${Student.PATH_URL}/${this.userDetailsId}/editar`]);
  }


}
