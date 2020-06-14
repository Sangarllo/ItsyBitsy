import { Component, OnInit, ViewChild, AfterViewInit} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Course } from '@models/course.model';
import { CoursesService } from '@services/courses.service';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';
import { UserService } from '@services/user.service';
import { UserDetails } from '@models/user.model';
import { Observable, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { CourseData } from '@models/report-summary';
import { ScriptService } from '@services/script.service';

@Component({
  selector: 'app-courses-view',
  templateUrl: './courses-view.component.html',
  styleUrls: ['./courses-view.component.scss']
})
export class CoursesView implements OnInit, AfterViewInit {

  columnsToDisplay = ['courseImage', 'courseName', 'type', 'schedule', 'teacher', 'aforo', 'actions'];

  public loading = true;
  dataSource = new MatTableDataSource();
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  courses$: Observable<Course[]>;
  teachers$: Observable<UserDetails[]>;

  constructor(
    private router: Router,
    private coursesSvc: CoursesService,
    private userSvc: UserService,
    private scriptSvc: ScriptService
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

  // Download PDF with data info
  downloadReport() {

    const data: CourseData[] = [];

    const courses = this.dataSource.data;
    courses.forEach(
      (course: Course) => {
        data.push(this.getReportData(course));
      });

    const dataTitle = ``;
    this.scriptSvc.downloadCoursesReport(
      `Cursos Actuales.pdf`,
      'Cursos Actuales',
      data,
    );
  }

  private getReportData(course: Course): CourseData {

    const name: string = course.name;
    const type: string = course.type;
    const schedule = `${course.weekDay}, de ${course.startTime} a ${course.endTime}`;
    const teacher = course.teacherName;
    const nStudents = course.studentList.length;

    return {
      name,
      type,
      schedule,
      teacher,
      nStudents
    };
  }


}
