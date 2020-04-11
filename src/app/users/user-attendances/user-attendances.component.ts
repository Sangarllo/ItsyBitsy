import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-attendances',
  templateUrl: './user-attendances.component.html',
  styleUrls: ['./user-attendances.component.scss']
})
// tslint:disable-next-line: component-class-suffix
export class UserAttendancesView {

  pageTitle: string = `Asistencias del mes`;
  errorMessage: string;

  date: Date;

  constructor(
    private router: Router) {

    // Lunes anterior
    const today = new Date();
    this.date = new Date( today.getFullYear(), today.getMonth(), 1 );
  }

  onUpdateMonth(newDate: Date): void {
    this.date = new Date(newDate);
  }

  gotoDashboard(): void {
    this.router.navigate([`usuarios/dashboard`]);
  }

}
