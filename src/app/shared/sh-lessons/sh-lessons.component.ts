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

@Component({
  selector: 'app-sh-lessons',
  templateUrl: './sh-lessons.component.html',
  styleUrls: ['./sh-lessons.component.scss']
})
export class ShLessonsComponent implements OnInit, AfterViewInit, OnChanges {

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  @Input() userDetails: UserDetails;
  @Input() dateIni: Date;
  @Input() dateEnd: Date;

  courses$: Observable<Course[]>;
  lessons$: Observable<Lesson[]>;
  lessons: Lesson[] = [];
  courses: Course[] = [];

  columnsToDisplay = [ 'status', 'courseImage', 'courseName', 'date', 'horario', 'classRoom'];
  dataSource = new MatTableDataSource();

  constructor(
    private dateSvc: DatesService,
    private lessonsSvc: LessonsService,
    private coursesSvc: CoursesService,
    private router: Router
  ) {
  }

  ngOnInit() {

    this.dataSource = new MatTableDataSource(this.lessons);

    this.displayLessons();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnChanges(): void {
    this.displayLessons();
  }

  viewLesson(lesson: Lesson) {
    this.router.navigate([`/${Course.PATH_URL}/${lesson.courseId}/${Lesson.PATH_URL}/${lesson.id}`]);
  }

  private displayLessons() {
    this.lessons$ = this.lessonsSvc.getLessonsByTeacher(this.userDetails, this.dateIni, this.dateEnd);
    this.courses$ = this.coursesSvc.getAllCourses();
    combineLatest([
      this.lessons$,
      this.courses$
    ])
      .pipe(map(([lessons, courses]) => lessons.map(lesson => ({
        ...lesson,
        date: this.dateSvc.fromFirebaseDate(lesson.date),
        courseName: courses.find(c => lesson.courseId === c.id).name,
        courseImage: courses.find(c => lesson.courseId === c.id).image,
      }) as Lesson)), tap(data => console.log('Lessons:  ', JSON.stringify(data))))
      .subscribe((lessons: Lesson[]) => {
        this.lessons = lessons;
        this.dataSource.data = this.lessons;
      });
  }


}
