import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { RateService } from '../../services/rates.service';
import { Rate } from '../../models/rate';


@Component({
  selector: 'app-sh-rate-data',
  templateUrl: './sh-rate-data.component.html',
  styleUrls: ['./sh-rate-data.component.scss']
})
export class ShRateDataComponent {

  @Input() rate: Rate;
  @Input() enableEdition: boolean;

  RATE_IMAGE = Rate.IMAGE_DEFAULT;

  constructor(
    private router: Router,
    private ratesSvc: RateService
    ) { }


  gotoEdition() {
    this.router.navigate([`/${Rate.PATH_URL}/${this.rate.id}/editar`]);
  }

  update(current: boolean) {
    this.rate.current = current;
    this.ratesSvc.updateRate(this.rate)
      .subscribe( rate => {
        this.rate = rate;
      });
  }

}
