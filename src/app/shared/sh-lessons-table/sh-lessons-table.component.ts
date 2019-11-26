import { Component, OnInit, ViewChild, Input} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Course } from '../../models/course.model';
import { CoursesService } from '../../services/courses.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { Lesson } from '../../models/lesson.model';
import { LessonsService } from '../../services/lessons.service';
import { Observable } from 'rxjs';
import { DatesService } from '../../services/dates.service';


@Component({
  selector: 'sh-lessons-table',
  templateUrl: './sh-lessons-table.component.html',
  styleUrls: ['./sh-lessons-table.component.scss']
})
export class ShLessonsTableComponent implements OnInit {

  columnsToDisplay = ['date', 'startTime', 'endTime', 'status', 'material'];
  dataSource: MatTableDataSource<Lesson>;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @Input() course: Course;
  lessons: Lesson[];

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

            this.dataSource = new MatTableDataSource(lessons);
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
