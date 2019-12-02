import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Student } from 'src/app/models/student.model';
import { Course } from 'src/app/models/course.model';
import { UserDetails } from '../../models/user.model';
import { Rate } from '../../models/rate';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.scss']
})
export class UserDashboardComponent implements OnInit {

  constructor(
    private router: Router,
  ) { }

  ngOnInit() {
  }

  gotoStudentsList() {
    this.router.navigate([`/${Student.PATH_URL}`]);
  }

  gotoUsersList() {
    this.router.navigate([`/${UserDetails.PATH_URL}`]);
  }

  gotoCoursesList() {
    this.router.navigate([`/${Course.PATH_URL}`]);
  }

  gotoRates() {
    this.router.navigate([`/${Rate.PATH_URL}`]);
  }

}
