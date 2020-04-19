import { Router } from '@angular/router';
import { Course } from './../../models/course.model';
import { Component, OnInit, Input, AfterViewInit, ViewChild, OnChanges } from '@angular/core';
import { LessonsService } from '../../services/lessons.service';
import { UserDetails } from '../../models/user.model';
import { Observable, forkJoin, combineLatest } from 'rxjs';
import { Lesson } from '../../models/lesson.model';
import { DatesService } from '../../services/dates.service';
import { map, tap } from 'rxjs/operators';
import { CoursesService } from '../../services/courses.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { UserService } from '../../services/user.service';

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

  teachers$: Observable<UserDetails[]>;
  courses$: Observable<Course[]>;
  lessons$: Observable<Lesson[]>;
  lessons: Lesson[] = [];
  courses: Course[] = [];

  columnsToDisplay = [ 'teacherImage', 'teacherName',
    'courseImage', 'courseName',
    'date', 'horario', 'classRoom'];

  dataSource = new MatTableDataSource(this.lessons);

  constructor(
    private dateSvc: DatesService,
    private userSvc: UserService,
    private lessonsSvc: LessonsService,
    private coursesSvc: CoursesService,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.displayLessons();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnChanges(): void {
    this.displayLessons();
  }

  gotoTeacher(teacherId: string) {
    this.router.navigate([`/${UserDetails.PATH_URL}/${teacherId}`]);
  }

  viewLesson(lesson: Lesson) {
    this.router.navigate([`/${Course.PATH_URL}/${lesson.courseId}/${Lesson.PATH_URL}/${lesson.id}`]);
  }

  private displayLessons() {

    console.log(`displayLessons`);
    console.log(`${this.userDetails}`);

    this.courses$ = this.coursesSvc.getAllCourses();
    this.teachers$ = this.userSvc.getAllTeachers();
    this.lessons$ = ( this.userDetails ) ?
      this.lessonsSvc.getLessonsByTeacherByDate(this.userDetails, this.dateIni, this.dateEnd) :
      this.lessonsSvc.getAllLessonsByDate( this.dateIni, this.dateEnd );

    combineLatest([
      this.lessons$,
      this.courses$,
      this.teachers$
    ])
      .pipe(map(([lessons, courses, teachers]) => lessons.map(lesson => ({
        ...lesson,
        date: this.dateSvc.fromFirebaseDate(lesson.date),
        teacherName: teachers.find(c => lesson.teacherId === c.uid)?.displayName,
        teacherImage: teachers.find(c => lesson.teacherId === c.uid)?.photoURL,
        courseName: courses.find(c => lesson.courseId === c.id).name,
        courseImage: courses.find(c => lesson.courseId === c.id).image,
      }) as Lesson)), tap(data => console.log('Lessons:  ', JSON.stringify(data))))
      .subscribe((lessons: Lesson[]) => {
        this.lessons = lessons;
        this.dataSource.data = this.lessons;
      });
  }


}
