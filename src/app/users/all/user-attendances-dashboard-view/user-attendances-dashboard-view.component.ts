import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DatesService } from '@services/dates.service';
import { LessonsService } from '@services/lessons.service';
import { Lesson } from '@models/lesson.model';
import { Observable, combineLatest } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Course } from '@models/course.model';
import { CoursesService } from '@services/courses.service';

@Component({
  selector: 'app-user-attendances-dashboard-view',
  templateUrl: './user-attendances-dashboard-view.component.html',
  styleUrls: ['./user-attendances-dashboard-view.component.scss']
})
export class UserAttendancesDashboardView implements OnInit {

  pageTitle: string;
  errorMessage: string;
  dateIni: Date;
  dateEnd: Date;

  courses$: Observable<Course[]>;
  lessons$: Observable<Lesson[]>;
  public loading = true;
  lessons: Lesson[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private lessonsSvc: LessonsService,
    private coursesSvc: CoursesService,
    private dateSvc: DatesService) {
      this.pageTitle = 'Tablero diario de asistencias';

      // Fechas que limitan la semana
      this.dateIni = this.dateSvc.getToday();
      this.dateEnd = this.dateSvc.getToday();
  }


  ngOnInit(): void {
    this.displayAttendances();
  }

  onUpdateDate(fecha: Date): void {
    this.dateIni = new Date(fecha);
    this.dateEnd = new Date(fecha);
    this.displayAttendances();
  }

  private displayAttendances() {

    this.loading = true;
    this.lessons$ = this.lessonsSvc.getAllLessonsByDate(null, this.dateIni, this.dateEnd);
    this.courses$ = this.coursesSvc.getAllCourses('');
    /*
    this.attendances$ = this.attendancesSvc.getAllAttendancesByDates( null, this.dateIni, this.dateEnd);
    */

    combineLatest([
      this.lessons$,
      this.courses$,
    ])
      .pipe(map(([lessons, courses]) => lessons.map(lesson => ({
        ...lesson,
        date: this.dateSvc.fromFirebaseDate(lesson.date),
        course: courses.find(c => lesson.courseId === c.id)
      }) as Lesson)),
        // tap(data => console.log('Lessons:  ', JSON.stringify(data)))
      )
      .subscribe((lessons: Lesson[]) => {
        this.lessons = lessons;
        this.loading = false;
      });
  }

  gotoDashboard(): void {
    this.router.navigate([`usuarios/dashboard`]);
  }
}
