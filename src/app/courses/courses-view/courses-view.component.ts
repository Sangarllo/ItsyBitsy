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
import { Observable, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-courses-view',
  templateUrl: './courses-view.component.html',
  styleUrls: ['./courses-view.component.scss']
})
export class CoursesView implements OnInit, AfterViewInit {

  columnsToDisplay = ['image', 'name', 'type', 'schedule', 'teacher', 'aforo', 'actions'];

  public loading = true;
  dataSource = new MatTableDataSource();
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  courses$: Observable<Course[]>;
  teachers$: Observable<UserDetails[]>;

  constructor(
    private router: Router,
    private coursesSvc: CoursesService,
    private userSvc: UserService
  ) {
  }

  ngOnInit() {
    this.courses$ = this.coursesSvc.getAllCourses();
    this.teachers$ = this.userSvc.getAllTeachers();
    this.displayData();
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

  private displayData() {

    combineLatest([
      this.courses$,
      this.teachers$
    ])
      .pipe(map(([courses, teachers]) => courses.map(course => ({
        ...course,

        teacherName: teachers.find(t => course.teacherId === t.uid)?.displayName,
        teacherImage: teachers.find(t => course.teacherId === t.uid)?.displayName,
      }) as Course)))
    .subscribe((courses: Course[]) => {
      this.dataSource.data = courses;
      this.loading = false;
    });
  }
}
