import { Component, OnInit, ViewChild, Input} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Course } from '../../models/course.model';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { Lesson } from '../../models/lesson.model';
import { LessonsService } from '../../services/lessons.service';
import { DatesService } from '../../services/dates.service';


@Component({
  selector: 'sh-course-lessons-table',
  templateUrl: './sh-course-lessons-table.component.html',
  styleUrls: ['./sh-course-lessons-table.component.scss']
})
export class ShCourseLessonsTableComponent implements OnInit {

  columnsToDisplay = ['date', 'startTime', 'endTime', 'material', 'status'];
  dataSource: MatTableDataSource<Lesson>;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @Input() course: Course;
  lessons: Lesson[] = [];

  constructor(
    private lessonsSvc: LessonsService,
    private dateSvc: DatesService,
    private router: Router
  ) { }

  ngOnInit() {

        this.lessonsSvc.getLessonsByCourseId(this.course).subscribe(
          (lessons: Lesson[]) => {

            lessons.forEach(lesson => {
              lesson.date = this.dateSvc.fromFirebaseDate(lesson.date);
            });

            this.lessons = lessons;
            this.dataSource = new MatTableDataSource(this.lessons);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
          });
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

  onRowClicked(lesson) {
    this.router.navigate([`/${Course.PATH_URL}/${this.course.id}/${Lesson.PATH_URL}/${lesson.id}`]);
  }
}
