import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import moment from 'moment';
import { DatesService } from '@services/dates.service';

@Component({
  selector: 'app-user-comments-view',
  templateUrl: './user-comments-view.component.html',
  styleUrls: ['./user-comments-view.component.scss']
})
export class UserCommentsView implements OnInit {

  pageTitle: string = '';
  errorMessage: string;

  date: Date;
  month: string = '';

  constructor(
    private router: Router ) {

      moment.locale('es');

      // Primer día del mes
      const today = new Date();
      this.date = new Date( today.getFullYear(), today.getMonth(), 1 );
      this.month = moment(this.date).format('MMMM [de] YYYY');
  }

  ngOnInit(): void {
  }


  displayTitle(): void {
    this.pageTitle = `Listado de comentarios de ${this.month}`;
  }

  onUpdateMonth(newDate: Date): void {
    this.date = new Date(newDate);

    this.month = moment(this.date).format('MMMM [de] YYYY');
    this.displayTitle();
  }

  gotoDashboard(): void {
    this.router.navigate([`usuarios/dashboard`]);
  }

}
