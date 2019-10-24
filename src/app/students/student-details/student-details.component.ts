import { Component, OnInit } from '@angular/core';
import { StudentsService } from '../../services/students.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Student } from '../../models/student.model';

@Component({
  selector: 'app-student-details',
  templateUrl: './student-details.component.html',
  styleUrls: ['./student-details.component.scss']
})
export class StudentDetailsComponent implements OnInit {

  studentId: string;
  student: Student;

  constructor(
    private studentService: StudentsService,
    private route: ActivatedRoute,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.studentId = this.route.snapshot.paramMap.get('id');
    this.studentService.getStudent(this.studentId)
      .subscribe( (student) => {
        this.student = new Student(
          student.payload.data()['displayName'],
          student.payload.data()['photoURL'],
          student.payload.data()['email'],
          student.payload.data()['phone'],
          student.payload.data()['contact'],
          student.payload.data()['fare'],
        );
      });
  }

  gotoEdition() {
    this.router.navigate([`/estudiantes/${this.studentId}/editar`]);
  }

}
