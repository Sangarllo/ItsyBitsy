import { Component, OnInit } from '@angular/core';
import { RateService } from '@services/rates.service';
import { UserService } from '@services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Rate } from '@models/rate';
import { UserDetails } from '@models/user.model';


@Component({
  selector: 'app-rate-detail-view',
  templateUrl: './rate-detail-view.component.html',
  styleUrls: ['./rate-detail-view.component.scss']
})
export class RateDetailView implements OnInit {

  pageTitle = 'Detalles de la Tarifa';
  errorMessage: string;

  rateId: string;
  rate: Rate;
  students: UserDetails[];

  constructor(
    private rateService: RateService,
    private userSvc: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.rateId = this.route.snapshot.paramMap.get('id');
    this.rateService.getRate(this.rateId)
    .subscribe({
      next: rate => {
        this.rate = rate;
        this.pageTitle = `Detalles de la tarifa ${this.rate.name}`;
        this.userSvc.getStudentsByRate(rate.id).subscribe(
          (students: UserDetails[]) => {
            this.students = students;
          }
        );
      },
      error: err => this.errorMessage = err
    });
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

}
