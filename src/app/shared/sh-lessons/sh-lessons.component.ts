import { Router } from '@angular/router';
import { Component, OnInit, Input, AfterViewInit, ViewChild, OnChanges } from '@angular/core';
import { Observable, forkJoin, combineLatest } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { UserService } from '@services/user.service';
import { CoursesService } from '@services/courses.service';
import { DatesService } from '@services/dates.service';
import { LessonsService } from '@services/lessons.service';
import { AttendancesService } from '@services/attendances.service';
import { UserDetails } from '@models/user.model';
import { WeekLessonsData } from '@models/report-summary';
import { Attendance } from '@models/attendance.model';
import { Lesson } from '@models/lesson.model';
import { Course } from '@models/course.model';
import { ClassRoom } from '../../models/classroom';
import { ScriptService } from '../../services/script.service';

@Component({
  selector: 'app-sh-lessons',
  templateUrl: './sh-lessons.component.html',
  styleUrls: ['./sh-lessons.component.scss']
})
export class ShLessonsComponent implements OnInit, AfterViewInit, OnChanges {

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  @Input() userDetails: UserDetails = null;
  @Input() dateIni: Date;
  @Input() dateEnd: Date;

  teachers: UserDetails[];
  teachers$: Observable<UserDetails[]>;
  courses$: Observable<Course[]>;
  lessons$: Observable<Lesson[]>;
  attendances$: Observable<Attendance[]>;
  lessons: Lesson[] = [];
  courses: Course[] = [];

  columnsToDisplay = [ 'teacherImage',
    'courseImage', 'courseName', 'schedule', 'classRoom', 'attendances', ];

  public loading = true;
  dataSource = new MatTableDataSource(this.lessons);

  constructor(
    private dateSvc: DatesService,
    private userSvc: UserService,
    private lessonsSvc: LessonsService,
    private attendancesSvc: AttendancesService,
    private scriptSvc: ScriptService,
    private coursesSvc: CoursesService,
    private datesSvc: DatesService,
    private router: Router
  ) {
    this.loading = true;
  }

  ngOnInit() {
    this.displayLessons();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnChanges(): void {
    this.loading = true;
    this.displayLessons();
  }

  gotoTeacher(teacherId: string) {
    this.router.navigate([`/${UserDetails.PATH_URL}/${teacherId}`]);
  }

  viewLesson(lesson: Lesson) {
    this.router.navigate([`/${Course.PATH_URL}/${lesson.courseId}/${Lesson.PATH_URL}/${lesson.id}`]);
  }

  private displayLessons() {

    this.courses$ = this.coursesSvc.getAllCourses();
    this.teachers$ = this.userSvc.getAllTeachers();
    this.attendances$ = this.attendancesSvc.getAllAttendancesByDates(this.dateIni, this.dateEnd);
    this.lessons$ = ( this.userDetails ) ?
      this.lessonsSvc.getLessonsByTeacherByDate(this.userDetails, this.dateIni, this.dateEnd) :
      this.lessonsSvc.getAllLessonsByDate( this.dateIni, this.dateEnd );

    combineLatest([
      this.lessons$,
      this.courses$,
      this.teachers$,
      this.attendances$
    ])
      .pipe(map(([lessons, courses, teachers, attendances]) => lessons.map(lesson => ({
        ...lesson,
        date: this.dateSvc.fromFirebaseDate(lesson.date),
        attendances: attendances.filter(a => a.lessonId === lesson.id),
        teacherName: teachers.find(c => lesson.teacherId === c.uid)?.displayName,
        teacherImage: teachers.find(c => lesson.teacherId === c.uid)?.photoURL,
        courseName: courses.find(c => lesson.courseId === c.id)?.name,
        courseImage: courses.find(c => lesson.courseId === c.id)?.image,
      }) as Lesson)),
        // tap(data => console.log('Lessons:  ', JSON.stringify(data)))
      )
      .subscribe((lessons: Lesson[]) => {
        this.lessons = lessons;
        this.dataSource.data = this.lessons;
        this.loading = false;
      });
  }

  // Download PDF with recipts info
  downloadAllInfo() {

    const data: WeekLessonsData[] = [];
    this.lessons.forEach(
      (lesson: Lesson) => {
        data.push(this.getReportData(lesson));
      });

    const dateIniStr = this.dateSvc.getLargeFormatedDate(this.dateIni);
    const dateEndStr = this.dateSvc.getLargeFormatedDate(this.dateEnd);
    const dataTitle = `Clases del ${dateIniStr} al ${dateEndStr}`;

    this.scriptSvc.downloadWeekLessonReports(
      `Clases de la Semana.pdf`,
      dataTitle,
      data,
    );
  }

  private getReportData(lesson: Lesson): WeekLessonsData {

    const teacherName: string = lesson.teacherName;
    const courseName: string = lesson.courseName;
    // console.log(`date: ${lesson.date}`);
    // console.log(`getDay: ${lesson.date.getDay()}`);
    // const date = lesson.date.toLocaleDateString();
    // console.log(`date: ${date}`);
    const date = this.dateSvc.getShortFormatedDate(lesson.date);
    const schedule: string = `de ${lesson.startTime} a ${lesson.endTime}.`;
    const classRoom = lesson.classRoom;
    const studentNames = [];
    lesson.attendances.forEach(attendance => {
      studentNames.push(attendance.studentName);
    });

    return {
      teacherName,
      courseName,
      date,
      schedule,
      classRoom,
      studentNames
    };
  }

}
