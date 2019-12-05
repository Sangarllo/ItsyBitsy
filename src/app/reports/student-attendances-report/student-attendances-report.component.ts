import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { UserDetails } from '../../models/user.model';
import { UserService } from '../../services/user.service';
import { Observable } from 'rxjs';

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
  students$: Observable<UserDetails[]>;
  showReportFilters: boolean = true;
  dateIni: Date = new Date(2000, 1, 1);
  dateEnd: Date = new Date(3000, 1, 1);

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
    this.showReportFilters = false;
  }

  showList() {
    this.student = null;
    this.pageTitle = 'Informe de Estudiantes';
    this.showReportFilters = true;
  }

}
