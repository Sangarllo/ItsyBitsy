import { Component, OnInit, ViewChild, AfterViewInit} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Course } from '@models/course.model';
import { CoursesService } from '@services/courses.service';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { LessonsService } from '@services/lessons.service';
import { Lesson } from '@models/lesson.model';
import { DatesService } from '@services/dates.service';
import { AttendancesService } from '@services/attendances.service';
import { UserService } from '@services/user.service';
import { UserDetails } from '@models/user.model';
import Swal from 'sweetalert2';
import { Observable } from 'rxjs';
import moment from 'moment';

@Component({
  selector: 'app-course-dashboard-view',
  templateUrl: './course-dashboard-view.component.html',
  styleUrls: ['./course-dashboard-view.component.scss']
})
export class CourseDashboardView implements OnInit, AfterViewInit {

  columnsToDisplay = [ 'teacherImage', 'courseImage', 'courseName',
    'schedule', 'aforo',
    'weekLessonActions', 'weekLesson',
    'nextLessonActions', 'nextLesson', ];

  public loading = true;
  dataSource = new MatTableDataSource();
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  courses: Course[] = [];

  public weekMonday: any;
  public weekFriday: any;
  public nextMonday: any;
  public nextFriday: any;

  constructor(
    private router: Router,
    private dateSvc: DatesService,
    private courseSvc: CoursesService,
    private lessonSvc: LessonsService,
    private attendanceSvc: AttendancesService,
    private userSvc: UserService
  ) {
    this.loading = true;

    this.weekMonday = moment(this.dateSvc.getWeekMonday());
    this.weekFriday = moment(this.dateSvc.getWeekFriday());
    this.nextMonday = moment(this.dateSvc.getNextMonday());
    this.nextFriday = moment(this.dateSvc.getNextFriday());
  }

  ngOnInit() {
    const orderByTeacher = true;
    this.courseSvc.getAllCourses(orderByTeacher).subscribe(
      (courses: Course[]) => {

        this.courses = courses;
        this.completeCoursesInfo();
        this.dataSource.data = this.courses;
        this.loading = false;
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

  gotoCourse(course: Course) {
    this.router.navigate([`${Course.PATH_URL}/${course.id}`]);
  }

  gotoLesson(course: Course, lessonId: string) {
    this.router.navigate([`/${Course.PATH_URL}/${course.id}/${Lesson.PATH_URL}/${lessonId}`]);
  }

  // TODO: Instead of going to form
  addManualNextLesson(course: Course) {
    this.router.navigate([`/${Course.PATH_URL}/${course.id}/${Lesson.PATH_URL}/0/editar`]);
  }


  // Add a new lesson for this course this/next week (if doesn't exist)
  addSimpleLesson(course: Course, multiple: boolean, nextWeek: boolean) {

    const lessons$: Observable<Lesson[]> = ( nextWeek ) ?
      this.lessonSvc.getNextLessons(course, 1) :
      this.lessonSvc.getWeekLessons(course, 1);

    lessons$.subscribe( (lessons: Lesson[]) => {
      if ( lessons.length === 0 ) {

        this.courseSvc.getCourse(course.id)
          .subscribe((theCourse: Course) => {

            this.lessonSvc.getLesson(theCourse, '0', nextWeek)
              .subscribe((dataLesson: any) => {

                this.lessonSvc.createLesson(theCourse, dataLesson)
                  .subscribe((newLesson: Lesson) => {

                    this.attendanceSvc.createAttendancesFromStudentList(theCourse, newLesson);
                    if ( !multiple ) {
                      Swal.fire({
                        icon: 'success',
                        title: 'Clase creada con éxito',
                        text: `Se ha creado una clase para el curso ${course.name}`,
                      });
                    } else {
                      console.log(`Se ha creado una clase para el curso ${course.name}`);
                    }
                  });
              });
          });
      }
    });
  }

  // Add a new lesson for this course this week (if doesn't exist)
  addWeekLesson(course: Course) {
    this.addSimpleLesson(course, false, false);
  }

  // Add a new lesson for this course next week (if doesn't exist)
  addNextLesson(course: Course) {
    this.addSimpleLesson(course, false, true);
  }


  addMultipleLessons(nextWeek: boolean) {
    this.courses.forEach(course => {
      const isLesson = ( nextWeek ) ? course.nextLesson : course.weekLesson;
      if ( !isLesson ) {
        this.addSimpleLesson(course, true, nextWeek);
      }
    });
  }

  addMultipleWeekLessons() {
    console.log(`adding week lessons`);
    this.addMultipleLessons(false);
  }

  addMultipleNextLessons() {
    console.log(`adding next lessons`);
    this.addMultipleLessons(true);
  }

  private completeCoursesInfo() {
    this.courses.forEach(course => {

      // This week lessons
      this.lessonSvc.getWeekLessons(course, 1)
          .subscribe( (lessons: Lesson[]) => {
            if ( lessons.length > 0 ) {
              const lesson = lessons[0];
              course.weekLesson = this.dateSvc.fromFirebaseDate(lesson.date);
              course.weekLessonId = lesson.id;
            } else {
              course.weekLesson = null;
              course.weekLessonId = null;
            }
      });


      // Next week lessons
      this.lessonSvc.getNextLessons(course, 1)
          .subscribe( (lessons: Lesson[]) => {
            if ( lessons.length > 0 ) {
              const lesson = lessons[0];
              course.nextLesson = this.dateSvc.fromFirebaseDate(lesson.date);
              course.nextLessonId = lesson.id;
            } else {
              course.nextLesson = null;
              course.nextLessonId = null;
            }
      });

      // Teacher
      this.userSvc.getUserDetails(course.teacherId)
        .subscribe( ( teacher: UserDetails) => {
          course.teacherName = teacher.displayName;
          course.teacherImage = teacher.photoURL;
      });
    });
  }
}
