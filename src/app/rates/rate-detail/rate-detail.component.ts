import { Component, OnInit } from '@angular/core';
import { RateService } from '../../services/rates.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Rate } from '../../models/rate';


@Component({
  selector: 'app-rate-detail',
  templateUrl: './rate-detail.component.html',
  styleUrls: ['./rate-detail.component.scss']
})
export class RateDetailComponent implements OnInit {

  pageTitle = 'Detalles de la Tarifa';
  errorMessage: string;

  rateId: string;
  rate: Rate;

  constructor(
    private rateService: RateService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.rateId = this.route.snapshot.paramMap.get('id');
    this.rateService.getRate(this.rateId)
    .subscribe({
      next: course => this.rate = course,
      error: err => this.errorMessage = err
    });
  }

  gotoEdition() {
    this.router.navigate([`/${Rate.PATH_URL}/${this.rateId}/editar`]);
  }

  gotoList() {
    this.router.navigate([`/${Rate.PATH_URL}/`]);
  }
}
