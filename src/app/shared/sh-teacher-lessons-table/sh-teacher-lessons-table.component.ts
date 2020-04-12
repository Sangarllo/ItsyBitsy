import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild, Input, AfterViewInit, Output, EventEmitter} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { UserDetails } from '../../models/user.model';
import Swal from 'sweetalert2';
import { DatesService } from '../../services/dates.service';
import { Lesson } from '../../models/lesson.model';
import { LessonsService } from '../../services/lessons.service';
import { Course } from '../../models/course.model';
import { CoursesService } from '../../services/courses.service';
import { AttendancesService } from '../../services/attendances.service';
import { Attendance } from '../../models/attendance.model';

@Component({
  selector: 'sh-teacher-lessons-table',
  templateUrl: './sh-teacher-lessons-table.component.html',
  styleUrls: ['./sh-teacher-lessons-table.component.scss']
})
export class ShTeacherLessonsTableComponent implements OnInit, AfterViewInit {

  @Output() reportLessons = new EventEmitter<Lesson[]>();
  columnsToDisplay = [ 'status', 'courseImage', 'courseName', 'date', 'startTime', 'endTime', 'attendancesNames', 'classRoom', 'actions'];
  dataSource = new MatTableDataSource();
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @Input() dateIni: Date;
  @Input() dateEnd: Date;
  @Input() teacher: UserDetails;
  lessons: Lesson[] = [];

  constructor(
    private dateSvc: DatesService,
    private lessonsSvc: LessonsService,
    private courseSvc: CoursesService,
    private attendancesSvc: AttendancesService,
    private router: Router
  ) { }


  ngOnInit() {

    this.dataSource = new MatTableDataSource(this.lessons);

    this.lessonsSvc.getLessonsByTeacherByDate(this.teacher, this.dateIni, this.dateEnd)
    .subscribe((lessons: Lesson[]) => {
      this.lessons = lessons;

      this.lessons.forEach((lesson: Lesson) => {
        lesson.date = this.dateSvc.fromFirebaseDate(lesson.date);

        this.courseSvc.getCourse(lesson.courseId)
          .subscribe( course => {
            lesson.courseImage = course.image;
            lesson.courseName = course.name;
          });

        this.attendancesSvc.getAllAttendancesByLesson(lesson)
          .subscribe( (lessonAttendances: Attendance[] ) => {
            lesson.attendancesNames = [];
            lessonAttendances.forEach(attendance => {
              lesson.attendancesNames.push(attendance.studentName);
            });
          });
      });

      this.dataSource.data = this.lessons;
      this.reportLessons.emit(this.lessons);
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

  viewLesson(lesson: Lesson) {
    this.router.navigate([`/${Course.PATH_URL}/${lesson.courseId}/${Lesson.PATH_URL}/${lesson.id}`]);
  }

  editLesson(lesson: Lesson) {
    this.router.navigate([`/${Course.PATH_URL}/${lesson.courseId}/${Lesson.PATH_URL}/${lesson.id}/editar`]);
  }
}
