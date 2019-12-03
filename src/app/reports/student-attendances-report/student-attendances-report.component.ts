import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { UserDetails } from '../../models/user.model';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-student-attendances-report',
  templateUrl: './student-attendances-report.component.html',
  styleUrls: ['./student-attendances-report.component.scss']
})
export class StudentAttendancesReportComponent implements OnInit {

  pageTitle = 'Informe de Estudiantes';
  errorMessage: string;
  student: UserDetails = null;
  selectedStudent: UserDetails;
  STUDENTS: UserDetails[] = [];
  showStudentList: boolean = true;

  constructor(
    public auth: AuthService,
    private userSvc: UserService

  ) { }

  ngOnInit() {

    this.userSvc.getAllStudents()
    .subscribe((students: UserDetails[]) => {
      this.STUDENTS = students;
    });
  }

  getReport() {
    this.student = this.selectedStudent;
    this.pageTitle = `Informe de asistencias de ${this.student.displayName}`;
    this.showStudentList = false;
  }

  showList() {
    this.student = null;
    this.pageTitle = 'Informe de Estudiantes';
    this.showStudentList = true;
  }

}
