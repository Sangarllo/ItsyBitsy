import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { CoursesService } from '@services/courses.service';
import { LessonsService } from '@services/lessons.service';
import { UserService } from '@services/user.service';
import { Lesson } from '@models/lesson.model';
import { DatesService } from '@services/dates.service';
import { combineLatest, Observable } from 'rxjs';
import { Course } from '@models/course.model';
import { UserDetails } from '@models/user.model';
import { map, tap } from 'rxjs/operators';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-lesson-audit-view',
  templateUrl: './lesson-audit-view.component.html',
  styleUrls: ['./lesson-audit-view.component.scss']
})
export class LessonAuditViewComponent implements OnInit, AfterViewInit {

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  lessons$: Observable<Lesson[]>;
  courses$: Observable<Course[]>;
  users$: Observable<UserDetails[]>;

  lessons: Lesson[] = [];
  courses: Course[] = [];

  columnsToDisplay = [ 'lessonId', 'creationDate', 'lessonActive', 'date', 'schedule',
    'courseId', 'courseActive', 'courseName',
    'classRoom', 'teacherName' ];

  public loading = true;
  nItems = 1000;
  dataSource = new MatTableDataSource(this.lessons);

  constructor(
    private route: ActivatedRoute,
    private dateSvc: DatesService,
    private coursesSvc: CoursesService,
    private lessonsSvc: LessonsService,
    private userSvc: UserService
  ) { }

  ngOnInit() {

    this.route.paramMap.subscribe(params => {
      this.nItems = +this.route.snapshot.paramMap.get('num');
    })
    console.log(`nItems: ${this.nItems}`);
    this.displayLessons();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  private displayLessons() {

    this.loading = true;
    this.lessons$ = this.lessonsSvc.auditAllLessons(this.nItems);
    this.courses$ = this.coursesSvc.auditAllCourses();
    this.users$ = this.userSvc.auditAllUser();

    combineLatest([
      this.lessons$,
      this.courses$,
      this.users$
    ])
      .pipe(map(([lessons, courses, users]) => lessons.map(lesson => ({
        ...lesson,
        creationDate: this.dateSvc.fromFirebaseDate(lesson.creationDate),
        date: this.dateSvc.fromFirebaseDate(lesson.date),
        teacherName: users.find(c => lesson.teacherId === c.uid)?.displayName,
        // courseName: courses.find(c => lesson.courseId === c.id)?.name,
        course: courses.find(c => lesson.courseId === c.id)
      }) as Lesson)),
        // tap(data => console.log('Lessons:  ', JSON.stringify(data)))
      )
      .subscribe((lessons: Lesson[]) => {
        this.lessons = lessons;
        this.dataSource.data = lessons;
        this.loading = false;
      });
  }

}
