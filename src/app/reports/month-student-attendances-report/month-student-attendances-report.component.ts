import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { UserDetails } from '../../models/user.model';
import { UserService } from '../../services/user.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-month-student-attendances-report',
  templateUrl: './month-student-attendances-report.component.html',
  styleUrls: ['./month-student-attendances-report.component.scss']
})
export class MonthStudentAttendancesReportComponent implements OnInit {

  pageTitle = 'Informe de Estudiantes por Mes';
  errorMessage: string;
  student: UserDetails = null;
  selectedStudent: UserDetails;
  students$: Observable<UserDetails[]>;
  showStudentList: boolean = true;

  constructor(
    public auth: AuthService,
    private userSvc: UserService
  ) { }

  ngOnInit() {
    this.students$ = this.userSvc.getAllStudents();
  }

  getReport() {
    this.student = this.selectedStudent;
    this.pageTitle = `Informe de asistencias de ${this.student.displayName}`;
    this.showStudentList = false;
  }

  showList() {
    this.student = null;
    this.pageTitle = 'Informe de Estudiantes por Mes';
    this.showStudentList = true;
  }

}
