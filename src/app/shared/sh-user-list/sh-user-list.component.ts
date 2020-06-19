import { Component, OnInit, Input, AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { UserDetails } from '@models/user.model';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'sh-user-list',
  templateUrl: './sh-user-list.component.html',
  styleUrls: ['./sh-user-list.component.scss']
})
export class ShUserListComponent implements OnInit, AfterViewInit {

  columnsToDisplay = ['studentImage', 'displayName', 'extraData', 'actions2'];
  dataSource = new MatTableDataSource();
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  @Input() users: UserDetails[];
  @Input() titleTable: string;
  @Input() type: string;

  constructor(
    private router: Router,
  ) {
  }

  ngOnInit() {
    this.sortStudentList();
  }

  ngAfterViewInit(): void {
    this.dataSource.data = this.users;
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  viewUser(userDetails: UserDetails) {
    this.router.navigate([`${UserDetails.PATH_URL}/${userDetails.uid}`]);
  }

  private sortStudentList() {
    // tslint:disable-next-line:max-line-length
    this.users.sort((a, b) => (a.displayName > b.displayName) ? 1 : (a.displayName === b.displayName) ? ((a.displayName > b.displayName) ? 1 : -1) : -1 );
  }

  gotoUserLessons(userDetails: UserDetails) {
    this.router.navigate([`${UserDetails.PATH_URL}/${userDetails.uid}/clases`]);
  }

  gotoUserAttendances(userDetails: UserDetails) {
    this.router.navigate([`${UserDetails.PATH_URL}/${userDetails.uid}/asistencias`]);
  }
}
