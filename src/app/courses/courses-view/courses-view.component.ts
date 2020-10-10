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
import { ReportsService } from '@services/reports.service';

@Component({
  selector: 'app-courses-view',
  templateUrl: './courses-view.component.html',
  styleUrls: ['./courses-view.component.scss']
})
export class CoursesView implements OnInit, AfterViewInit {

  // For reporting
  courses: Course[];

  columnsToDisplay = ['courseImage', 'order', 'type', 'courseName', 'scheduleDay', 'scheduleTime', 'teacher', 'aforo', 'actions'];

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
    private scriptSvc: ScriptService,
    private reportSvc: ReportsService
  ) {
  }

  ngOnInit() {
    this.courses$ = this.coursesSvc.getAllCourses('byOrder');
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
      this.courses = courses;
      this.dataSource.data = this.courses;
      this.loading = false;
    });
  }

  // Download PDF with data info
  downloadReport() {

    const reportTitle: string = 'Cursos Actuales';

    const data = this.reportSvc.getCoursesReportData(
      this.courses
    );

    this.scriptSvc.downloadCoursesReport(
      `${reportTitle}.pdf`,
      reportTitle,
      data,
    );
  }

  // Open selected PDF with recipts info
  openReport() {

    const reportTitle: string = 'Cursos Actuales';
    const data = this.reportSvc.getCoursesReportData(
      this.courses
    );

    this.scriptSvc.openCoursesReport(
      reportTitle,
      data,
    );
  }

}
