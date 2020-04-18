import { Component, OnInit, ViewChild, Input, AfterViewInit} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Course } from '../../models/course.model';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { Lesson } from '../../models/lesson.model';
import { LessonsService } from '../../services/lessons.service';
import { DatesService } from '../../services/dates.service';
import Swal from 'sweetalert2';
import { map, tap } from 'rxjs/operators';
import { Observable, combineLatest } from 'rxjs';
import { Attendance } from '../../models/attendance.model';
import { AttendancesService } from '../../services/attendances.service';

@Component({
  selector: 'sh-course-lessons-table',
  templateUrl: './sh-course-lessons-table.component.html',
  styleUrls: ['./sh-course-lessons-table.component.scss']
})
export class ShCourseLessonsTableComponent implements OnInit, AfterViewInit {

  columnsToDisplay = [ 'actions', 'schedule', 'attendances'];
  dataSource = new MatTableDataSource();
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @Input() course: Course;
  lessons: Lesson[] = [];

  lessons$: Observable<Lesson[]>;
  attendances$: Observable<Attendance[]>;

  constructor(
    private lessonsSvc: LessonsService,
    private attendancesSvc: AttendancesService,
    private dateSvc: DatesService,
    private router: Router
  ) { }

  ngOnInit() {


    this.attendances$ = this.attendancesSvc.getAllAttendancesByCourse(this.course);
    this.lessons$ = this.lessonsSvc.getLessonsByCourseId(this.course);

    combineLatest([
      this.lessons$,
      this.attendances$
    ])
      .pipe(map(([lessons, attendances]) => lessons.map(lesson => ({
        ...lesson,
        date: this.dateSvc.fromFirebaseDate(lesson.date),
        attendances: attendances.filter(a => a.lessonId === lesson.id)
      }) as Lesson)), tap(data => console.log('Lessons:  ', JSON.stringify(data))))
      .subscribe((lessons: Lesson[]) => {
        this.lessons = lessons;
        this.dataSource.data = this.lessons;
      });

/*
        this.lessonsSvc.getLessonsByCourseId(this.course)
        .pipe(
        )
        .subscribe(
          (lessons: Lesson[]) => {

            lessons.forEach(lesson => {
              lesson.date = this.dateSvc.fromFirebaseDate(lesson.date);
            });

            this.lessons = lessons;
            this.dataSource.data = this.lessons;
          });
          */
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
    this.router.navigate([`/${Course.PATH_URL}/${this.course.id}/${Lesson.PATH_URL}/0/editar`]);
  }

  gotoLesson(lesson: Lesson) {
    this.router.navigate([`/${Course.PATH_URL}/${this.course.id}/${Lesson.PATH_URL}/${lesson.id}`]);
  }

  editLesson(lesson: Lesson) {
    this.router.navigate([`/${Course.PATH_URL}/${this.course.id}/${Lesson.PATH_URL}/${lesson.id}/editar`]);
  }

  deleteLessons(lesson: Lesson) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: `Si pulsas OK, esta clase será eliminada`,
      icon: 'info',
      html:
      `Si pulsas OK, esta clase será <b>eliminada</b>`,
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: `OK`
    }).then((result) => {
      if (result.value) {

        lesson.current = false;

        this.lessonsSvc.updateLesson(this.course, lesson)
          .subscribe( () => {
            Swal.fire(
              status,
              `La lección ha sido eliminada.`,
              'success'
            );
          });
      }
    });
  }

}
