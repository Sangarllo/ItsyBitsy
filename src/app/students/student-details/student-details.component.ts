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
          student.payload.data()[Student.FIELD_DISPLAY_NAME],
          student.payload.data()[Student.FIELD_PHOTO_URL],
          student.payload.data()[Student.FIELD_EMAIL],
          student.payload.data()[Student.FIELD_PHONE],
          student.payload.data()[Student.FIELD_CONTACT],
          student.payload.data()[Student.FIELD_FARE],
        );
      });
  }

  gotoEdition() {
    this.router.navigate([`/estudiantes/${this.studentId}/editar`]);
  }

}
