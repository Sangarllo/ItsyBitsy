import { Component, OnInit } from '@angular/core';
import { Lesson } from '../../models/lesson.model';
import { CoursesService } from '../../services/courses.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserDetails } from '../../models/user.model';
import { Course } from '../../models/course.model';
import { LessonsService } from '../../services/lessons.service';

@Component({
  selector: 'app-lesson-add-student',
  templateUrl: './lesson-add-student.component.html',
  styleUrls: ['./lesson-add-student.component.scss']
})
export class LessonAddStudentComponent implements OnInit {

  pageTitle = 'Detalles de la lección';
  errorMessage: string;

  lessonId: string;
  lesson: Lesson;
  courseId: string;
  course: Course;

  constructor(
    private coursesService: CoursesService,
    private lessonsService: LessonsService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit() {

    this.courseId = this.route.snapshot.paramMap.get('courseId');
    this.coursesService.getCourse(this.courseId)
    .subscribe({
      next: course => this.course = course,
      error: err => this.errorMessage = err
    });

    this.lessonId = this.route.snapshot.paramMap.get('id');
    this.lessonsService.getLesson(this.lessonId, this.course)
    .subscribe({
      next: lesson => this.lesson = lesson,
      error: err => this.errorMessage = err
    });
  }

  selectStudent(userDetails: UserDetails) {
    console.log(`Student selected on lesson-add-student: ${userDetails.displayName}`);

    if (!this.isInArray(userDetails)) {
      this.lesson.studentList.push(userDetails);
      this.lessonsService.updateLesson(this.lesson)
        .subscribe( (lesson: Lesson) => {
          this.lesson = lesson;
        });
    }
  }

  applyStyles(userDetails: UserDetails) {
    const styles = {
      'background-image': `url("${userDetails.photoURL}")`,
      'background-size': 'cover'
    };
    return styles;
  }

  gotoUserDetails(userDetails: UserDetails) {
    console.log(`goto ${userDetails.uid}`);
    this.router.navigate([`${UserDetails.PATH_URL}/${userDetails.uid}`]);
  }

  private isInArray(userDetails: UserDetails): boolean {
    let isInArray: boolean = false;
    this.lesson.studentList.forEach(student => {
      console.log(`comparing: ${student.uid} === ${userDetails.uid}`);
      if ( student.uid === userDetails.uid ) {
        isInArray = true;
      }
    });
    return isInArray;
  }

}
