import { Component, OnInit, Input, AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { UserDetails } from 'src/app/models/user.model';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'sh-user-list',
  templateUrl: './sh-user-list.component.html',
  styleUrls: ['./sh-user-list.component.scss']
})
export class ShUserListComponent implements OnInit, AfterViewInit {

  columnsToDisplay = ['photoURL', 'displayName', 'actions'];
  dataSource = new MatTableDataSource();
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @Input() users: UserDetails[];

  constructor(
    private router: Router,
  ) { }

  ngOnInit() {
    this.sortStudentList();
    this.dataSource.data = this.users;
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyStyles(userDetails: UserDetails) {
    const styles = {
      'background-image': `url("${userDetails.photoURL}")`,
      'background-size': 'cover'
    };
    return styles;
  }

  viewUser(userDetails: UserDetails) {
    this.router.navigate([`${UserDetails.PATH_URL}/${userDetails.uid}`]);
  }

  editUser(userDetails: UserDetails) {
    this.router.navigate([`${UserDetails.PATH_URL}/${userDetails.uid}/editar`]);
  }

  private sortStudentList() {
    // tslint:disable-next-line:max-line-length
    this.users.sort((a, b) => (a.displayName > b.displayName) ? 1 : (a.displayName === b.displayName) ? ((a.displayName > b.displayName) ? 1 : -1) : -1 );
  }
}
