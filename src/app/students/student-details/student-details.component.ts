import { Component, OnInit, OnDestroy } from '@angular/core';
import { StudentsService } from '../../services/students.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Student } from '../../models/student.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-student-details',
  templateUrl: './student-details.component.html',
  styleUrls: ['./student-details.component.scss']
})
export class StudentDetailsComponent implements OnInit, OnDestroy {

  pageTitle = 'Detalles de Estudiante';
  errorMessage: string;

  studentId: string;
  student: Student;

  // private sub: Subscription;

  constructor(
    private studentService: StudentsService,
    private route: ActivatedRoute,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.studentId = this.route.snapshot.paramMap.get('id');
    this.studentService.getStudent(this.studentId)
      .subscribe({
        next: student => this.student = student,
        error: err => this.errorMessage = err
      });
  }

  ngOnDestroy(): void {
    // this.sub.unsubscribe();
  }

  gotoEdition() {
    this.router.navigate([`/${Student.PATH_URL}/${this.studentId}/editar`]);
  }

  gotoList(): void {
    this.router.navigate([`/${Student.PATH_URL}`]);
  }
}
