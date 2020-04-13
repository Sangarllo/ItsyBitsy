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
import { UserService } from '../../services/user.service';
import { UserDetails } from 'src/app/models/user.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-course-dashboard',
  templateUrl: './course-dashboard.component.html',
  styleUrls: ['./course-dashboard.component.scss']
})
export class CourseDashboardComponent implements OnInit, AfterViewInit {

  columnsToDisplay = ['image', 'name', 'schedule', 'teacher', 'aforo',
    'lastLesson', 'lastLessonActions',
    'nextLesson', 'nextLessonActions' ];
  dataSource = new MatTableDataSource();
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  courses: Course[] = [];

  constructor(
    private router: Router,
    private dateSvc: DatesService,
    private courseSvc: CoursesService,
    private lessonSvc: LessonsService,
    private attendanceSvc: AttendancesService,
    private userSvc: UserService
  ) { }

  ngOnInit() {
    this.courseSvc.getAllCourses().subscribe(
      (courses: Course[]) => {

        this.courses = courses;
        this.completeCoursesInfo();
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


  // Add a new lesson for this course this week (if doesn't exist)
  addWeekLesson(course: Course) {
    console.log(`adding auto last lesson`);

    // Last Lesson
    this.lessonSvc.getWeekLessons(course, 1)
     .subscribe( (lessons: Lesson[]) => {

      console.log(`Lecciones encontradas: ${lessons.length}`);
      if ( lessons.length === 0 ) {
        this.courseSvc.getCourse(course.id)
            .subscribe((theCourse: Course) => {
              this.lessonSvc.getLesson(theCourse, '0', false)
                .subscribe((dataLesson: any) => {
                  this.lessonSvc.createLesson(theCourse, dataLesson)
                    .subscribe((newLesson: Lesson) => {
                      this.attendanceSvc.createAttendancesFromStudentList(theCourse, newLesson);
                      Swal.fire({
                        icon: 'success',
                        title: 'Clase creada con éxito',
                        text: `Se ha creado una clase para el curso ${course.name}`,
                      });
                    });
                });

            });
          }
      });
    }



  // Add a new lesson for this course next week (if doesn't exist)
  addAutoNextLesson(course: Course) {
    console.log(`adding auto next lesson`);

    // Last Lesson
    this.lessonSvc.getNextLessons(course, 1)
     .subscribe( (lessons: Lesson[]) => {
      if ( lessons.length === 0 ) {

          this.courseSvc.getCourse(course.id)
            .subscribe((theCourse: Course) => {
              this.lessonSvc.getLesson(theCourse, '0', true)
                .subscribe((dataLesson: any) => {
                  this.lessonSvc.createLesson(theCourse, dataLesson)
                    .subscribe((newLesson: Lesson) => {
                      console.log(`new lesson ${newLesson.id}: ${newLesson.date}`);
                      this.attendanceSvc.createAttendancesFromStudentList(theCourse, newLesson);

                      Swal.fire({
                        icon: 'success',
                        title: 'Clase creada con éxito',
                        text: `Se ha creado una clase para el curso ${course.name}`,
                      });
                    });
                });

            });
          }
      });
    }



  addMultipleWeekLessons() {
    console.log(`adding week lessons`);
  }

  addMultipleNextLessons() {
    console.log(`adding next lessons`);
  }

  private completeCoursesInfo() {
    this.courses.forEach(course => {

      // This week lessons
      this.lessonSvc.getWeekLessons(course, 1)
          .subscribe( (lessons: Lesson[]) => {
            if ( lessons.length > 0 ) {
              const lesson = lessons[0];
              course.lastLesson = this.dateSvc.fromFirebaseDate(lesson.date);
              course.lastLessonId = lesson.id;
            } else {
              course.lastLesson = null;
              course.lastLessonId = null;
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
      });
    });
  }
}
