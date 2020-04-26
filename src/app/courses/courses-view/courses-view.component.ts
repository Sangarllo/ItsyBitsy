import { Component, OnInit, ViewChild, AfterViewInit} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Course } from '../../models/course.model';
import { CoursesService } from '../../services/courses.service';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';
import { UserService } from '../../services/user.service';
import { UserDetails } from 'src/app/models/user.model';

@Component({
  selector: 'app-courses-view',
  templateUrl: './courses-view.component.html',
  styleUrls: ['./courses-view.component.scss']
})
export class CoursesView implements OnInit, AfterViewInit {

  columnsToDisplay = ['image', 'name', 'type', 'schedule', 'teacher', 'aforo', 'actions'];
  dataSource = new MatTableDataSource();
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  courses: Course[] = [];

  constructor(
    private router: Router,
    private courseSvc: CoursesService,
    private userSvc: UserService
  ) { }

  ngOnInit() {
    this.courseSvc.getAllCourses()
      .subscribe(
      (courses: Course[]) => {
        this.courses = courses;
        this.completeCoursesInfo();
        this.dataSource.data = this.courses;
      });
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  gotoNew() {
    this.router.navigate([`${Course.PATH_URL}/0/editar`]);
  }

  gotoCourse(course) {
    this.router.navigate([`${Course.PATH_URL}/${course.id}`]);
  }

  private completeCoursesInfo() {
    this.courses.forEach(course => {
      this.userSvc.getUserDetails(course.teacherId)
        .subscribe( ( teacher: UserDetails) => {
          course.teacherName = teacher.displayName;
        });
    });
  }
}
