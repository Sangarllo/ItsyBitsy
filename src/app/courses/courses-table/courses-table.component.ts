import { Component, OnInit, ViewChild} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Course } from '../../models/course.model';
import { CoursesService } from '../../services/courses.service';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-courses-table',
  templateUrl: './courses-table.component.html',
  styleUrls: ['./courses-table.component.scss']
})
export class CoursesTableComponent implements OnInit {

  columnsToDisplay = ['name', 'weekDay', 'startTime', 'endTime'];
  dataSource: MatTableDataSource<Course>;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(
    private router: Router,
    private courseSvc: CoursesService
  ) { }

  ngOnInit() {
    this.courseSvc.getAllCourses().subscribe(
      (courses: Course[]) => {
        this.dataSource = new MatTableDataSource(courses);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
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

  onRowClicked(course) {
    console.log('Row clicked: ', course);
    this.router.navigate([`${Course.PATH_URL}/${course.id}`]);
  }
}
