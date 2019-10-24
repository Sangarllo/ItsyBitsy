import { Component, OnInit } from '@angular/core';
import { StudentsService } from '../../services/students.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Student } from '../../models/iStudent.interface';

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
          student.payload.data()['name'],
          student.payload.data()['surname'],
          '',
          '',
          ''
        );
      });
  }

  gotoEdition() {
    this.router.navigate([`/estudiantes/${this.studentId}/editar`]);
  }

}
