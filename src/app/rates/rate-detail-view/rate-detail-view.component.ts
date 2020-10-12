import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RateService } from '@services/rates.service';

import { combineLatest, Observable, forkJoin } from 'rxjs';

import { Rate } from '@models/rate';
import { UserDetails } from '@models/user.model';
import { UserService } from '@services/user.service';
import { ScriptService } from '@services/script.service';
import { ReportsService } from '@services/reports.service';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-rate-detail-view',
  templateUrl: './rate-detail-view.component.html',
  styleUrls: ['./rate-detail-view.component.scss']
})
export class RateDetailView implements OnInit {

  pageTitle = 'Detalles de la Tarifa';
  errorMessage: string;

  rateId: string;
  rate$: Observable<Rate>;
  students$: Observable<UserDetails[]>;

  constructor(
    private rateService: RateService,
    private userSvc: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private reportSvc: ReportsService,
    private scriptSvc: ScriptService,
  ) { }

  ngOnInit() {
    this.rateId = this.route.snapshot.paramMap.get('id');
    this.rate$ = this.rateService.getRate(this.rateId);
    this.students$ = this.userSvc.getStudentsByRate(this.rateId);
  }

  gotoEdition() {
    this.router.navigate([`/${Rate.PATH_URL}/${this.rateId}/editar`]);
  }

  gotoList() {
    this.router.navigate([`/${Rate.PATH_URL}/`]);
  }

  public gotoDashboard() {
    this.router.navigate([`/usuarios/dashboard`]);
  }

  // Download PDF with data info
  downloadReport() {

    let reportTitle = 'Alumnos con esta tarifa';
    let theRate: Rate;

    this.rate$.subscribe((rate: Rate) => {
        theRate = rate;
        reportTitle = `Alumnos con la tarifa ${rate.name}`;

        this.students$.subscribe((users: UserDetails[]) => {
          theRate.students = users;

          const data = this.reportSvc.getRateReportData(
            theRate
          );

          this.scriptSvc.downloadRatesReport(
            `${reportTitle}.pdf`,
            reportTitle,
            data,
          );
        });
      });
  }

  // Open PDF with data info
  openReport() {
    let reportTitle = 'Alumnos con esta tarifa';
    let theRate: Rate;

    this.rate$.subscribe((rate: Rate) => {
        theRate = rate;
        reportTitle = `Alumnos con la tarifa ${rate.name}`;

        this.students$.subscribe((users: UserDetails[]) => {
          theRate.students = users;

          const data = this.reportSvc.getRateReportData(
            theRate
          );

          this.scriptSvc.openRatesReport(
            reportTitle,
            data,
          );
        });
      });
  }
}
