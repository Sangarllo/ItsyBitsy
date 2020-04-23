import { Component, Input } from '@angular/core';
import { Course } from '../../models/course.model';
import { Router } from '@angular/router';
import { CoursesService } from '../../services/courses.service';

@Component({
  selector: 'app-sh-course-data',
  templateUrl: './sh-course-data.component.html',
  styleUrls: ['./sh-course-data.component.scss']
})
export class ShCourseDataComponent {

  @Input() course: Course;
  @Input() enableEdition: boolean;

  constructor(
    private router: Router,
    private coursesSvc: CoursesService
    ) { }


  gotoEdition() {
    this.router.navigate([`/${Course.PATH_URL}/${this.course.id}/editar`]);
  }

  update(current: boolean) {
    this.course.current = current;
    this.coursesSvc.updateCourse(this.course)
      .subscribe( course => {
        this.course = course;
      });
  }

}
