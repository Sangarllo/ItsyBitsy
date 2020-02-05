import { Component, OnInit, ViewChild, AfterViewInit} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Course } from '../../models/course.model';
import { CoursesService } from '../../services/courses.service';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { LessonsService } from '../../services/lessons.service';
import { Lesson } from '../../models/lesson.model';
import { DatesService } from '../../services/dates.service';
import { AttendancesService } from '../../services/attendances.service';


@Component({
  selector: 'app-course-dashboard',
  templateUrl: './course-dashboard.component.html',
  styleUrls: ['./course-dashboard.component.scss']
})
export class CourseDashboardComponent implements OnInit, AfterViewInit {

  columnsToDisplay = ['image', 'name', 'aforo',
    'lastLesson', 'lastLessonStatus', 'lastLessonActions',
    'nextLesson', 'nextLessonStatus', 'nextLessonActions' ];
  dataSource = new MatTableDataSource();
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  courses: Course[] = [];

  constructor(
    private router: Router,
    private dateSvc: DatesService,
    private courseSvc: CoursesService,
    private lessonSvc: LessonsService,
    private attendanceSvc: AttendancesService
  ) { }

  ngOnInit() {
    this.courseSvc.getAllCourses().subscribe(
      (courses: Course[]) => {

        this.courses = courses;
        this.courses.forEach(course => {

          // Last Lesson
          this.lessonSvc.getLastLessons(course, 1)
            .subscribe( (lessons: Lesson[]) => {
              if ( lessons.length > 0 ) {
                const lesson = lessons[0];
                course.lastLesson = this.dateSvc.fromFirebaseDate(lesson.date);
                course.lastLessonStatus = lesson.status;
                course.lastLessonId = lesson.id;
              } else {
                course.lastLesson = null;
                course.lastLessonStatus = null;
                course.lastLessonId = null;
              }
            });


          // Next Lesson
          this.lessonSvc.getNextLessons(course, 1)
            .subscribe( (lessons: Lesson[]) => {
              if ( lessons.length > 0 ) {
                const lesson = lessons[0];
                course.nextLesson = this.dateSvc.fromFirebaseDate(lesson.date);
                course.nextLessonStatus = lesson.status;
                course.nextLessonId = lesson.id;
              } else {
                course.nextLesson = null;
                course.nextLessonStatus = null;
                course.nextLessonId = null;
              }
            });
        });

        this.dataSource.data = this.courses;
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

  viewLesson(course: Course, lessonId: string) {
    this.router.navigate([`/${Course.PATH_URL}/${course.id}/${Lesson.PATH_URL}/${lessonId}`]);
  }

  // TODO: Instead of going to form
  addManualNextLesson(course: Course) {
    this.router.navigate([`/${Course.PATH_URL}/${course.id}/${Lesson.PATH_URL}/0/editar`]);
  }

  addAutoNextLesson(course: Course) {
    console.log(`adding auto next lesson`);

    const courseId = course.id;
    this.courseSvc.getCourse(courseId)
      .subscribe((theCourse: Course) => {
        this.lessonSvc.getLesson(theCourse, '0')
          .subscribe((dataLesson: any) => {
            console.log(`ini lesson from course ${JSON.stringify(dataLesson)}`);
            this.lessonSvc.createLesson(theCourse, dataLesson)
              .subscribe((newLesson: Lesson) => {
                console.log(`new lesson ${JSON.stringify(newLesson)}`);
                this.attendanceSvc.createAttendancesFromStudentList(theCourse, newLesson);
              });
          });
      });
  }

  addAutoNextLessons() {
    console.log(`adding next lessons`);
  }
}
