import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DatesService } from '@services/dates.service';

@Component({
  selector: 'app-user-attendances-dashboard-view',
  templateUrl: './user-attendances-dashboard-view.component.html',
  styleUrls: ['./user-attendances-dashboard-view.component.scss']
})
export class UserAttendancesDashboardView implements OnInit {

  pageTitle: string;
  errorMessage: string;
  date: Date;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dateSvc: DatesService) {
      this.pageTitle = 'Tablero diario de asistencias';

      // Fechas que limitan la semana
      this.date = this.dateSvc.getWeekMonday();
  }


  ngOnInit(): void {
  }

  onUpdateDate(fecha: Date): void {
    this.date = new Date(fecha);
  }

  gotoDashboard(): void {
    this.router.navigate([`usuarios/dashboard`]);
  }
}
