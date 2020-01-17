import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { UserDetails } from '../../models/user.model';
import { UserService } from '../../services/user.service';
import { Observable } from 'rxjs';
import { Lesson } from '../../models/lesson.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-lesson-dashboard',
  templateUrl: './lesson-dashboard.component.html',
  styleUrls: ['./lesson-dashboard.component.scss']
})
export class LessonDashboardComponent implements OnInit {

  pageTitle = 'Próximas clases de los profesores';
  errorMessage: string;
  teacher: UserDetails = null;
  selectedTeacher: UserDetails;
  teachers$: Observable<UserDetails[]>;
  showReportFilters: boolean = true;
  infoLessons: string;

  dateIni: Date = new Date();
  dateEnd: Date = new Date();

  reportErrors: string[];

  constructor(
    public auth: AuthService,
    private userSvc: UserService
  ) { }

  ngOnInit() {
    this.teachers$ = this.userSvc.getAllTeachers();
  }

  getReport() {
    this.reportErrors = [];
    this.teacher = this.selectedTeacher;

    this.pageTitle = `Informe de asistencias de ${this.teacher.displayName} esta semana`;

    // Lunes anterior
    this.dateIni = new Date();
    this.dateIni.setDate(this.dateIni.getDate() - (this.dateIni.getDay() + 6) % 7);

    // Lunes próximo
    this.dateEnd = new Date();
    this.dateEnd.setDate(this.dateIni.getDate() + 6);


    this.showReportFilters = false;
  }

  reportLessons(lessons: Lesson[]) {

    this.infoLessons = `Tiene ${lessons.length} clases`;

    if ( lessons.length === 0 ) {
      Swal.fire({
        icon: 'error',
        title: 'Hubo algún error',
        text: 'No hubo errores'
      });
    }
  }

  showList() {
    this.teacher = null;
    this.pageTitle = 'Informe de Clases por Profesor';
    this.showReportFilters = true;
    this.reportErrors = null;
  }


}
