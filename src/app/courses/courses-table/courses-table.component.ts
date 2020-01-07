import { Component, OnInit, ViewChild, AfterViewInit} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Course } from '../../models/course.model';
import { CoursesService } from '../../services/courses.service';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-courses-table',
  templateUrl: './courses-table.component.html',
  styleUrls: ['./courses-table.component.scss']
})
export class CoursesTableComponent implements OnInit, AfterViewInit {

  columnsToDisplay = ['image', 'name', 'aforo', 'type', 'schedule', 'actions'];
  dataSource = new MatTableDataSource();
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(
    private router: Router,
    private courseSvc: CoursesService
  ) { }

  ngOnInit() {
    this.courseSvc.getAllCourses().subscribe(
      (courses: Course[]) => {
        this.dataSource.data = courses;
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

  viewCourse(course) {
    this.router.navigate([`${Course.PATH_URL}/${course.id}`]);
  }

  editCourse(course) {
    this.router.navigate([`${Course.PATH_URL}/${course.id}/editar`]);
  }

  deleteCourse(course: Course) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: `Si pulsas OK, el curso ${course.name} quedará eliminado y no podrás revertir dicha acción`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, ¡bórralo!'
    }).then((result) => {
      if (result.value) {

        course.current = false;
        this.courseSvc.updateCourse(course)
        .subscribe({
          next: () => {
            Swal.fire(
              'Borrado!',
              `El curso ${course.name} ha sido eliminado.`,
              'success'
            );
          },
          error: err => {
            Swal.fire(
              'Ups!',
              `El curso ${course.name} no ha podido ser eliminado.`,
              'error'
            );
          },
        });


      }
    });
  }

}
