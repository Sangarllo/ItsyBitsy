import { Component, OnInit, ViewChild, AfterViewInit} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { Rate } from '@models/rate';
import { RateService } from '@services/rates.service';
import Swal from 'sweetalert2';
import { UserDetails } from '@models/user.model';
import { Observable, combineLatest } from 'rxjs';
import { UserService } from '@services/user.service';
import { map } from 'rxjs/operators';
import { ScriptService } from '@services/script.service';
import { RateData } from '@models/report-summary';


@Component({
  selector: 'app-rates-view',
  templateUrl: './rates-view.component.html',
  styleUrls: ['./rates-view.component.scss']
})
export class RatesView implements OnInit, AfterViewInit {

  columnsToDisplay = ['rateImage', 'name', 'type', 'price', 'students', 'actions'];
  dataSource = new MatTableDataSource();
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  rates$: Observable<Rate[]>;
  students$: Observable<UserDetails[]>;

  constructor(
    private router: Router,
    private scriptSvc: ScriptService,
    private rateSvc: RateService,
    private userSvc: UserService,
  ) { }

  ngOnInit() {
    this.rates$ = this.rateSvc.getAllRates();
    this.students$ = this.userSvc.getAllStudents();
  }

  ngAfterViewInit() {

    combineLatest([
      this.rates$,
      this.students$
    ])
      .pipe(map(([rates, students]) => rates.map(rate => ({
        ...rate,
        students: students.filter(st => st.rateId === rate.id),
      }) as Rate)))
    .subscribe((rates: Rate[]) => {
      this.dataSource.data = rates;
    });

    /*
    this.rateSvc.getAllRates().subscribe(
      (rates: Rate[]) => {
        this.dataSource.data = rates;
    });
    */

    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  gotoNew() {
    this.router.navigate([`${Rate.PATH_URL}/0/editar`]);
  }

  gotoRate(rate: Rate) {
    this.router.navigate([`${Rate.PATH_URL}/${rate.id}`]);
  }


  deleteRate(rate: Rate) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: `Si pulsas OK, la tarifa ${rate.name} quedará eliminada y no podrás revertir dicha acción`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, ¡bórrala!'
    }).then((result) => {
      if (result.value) {

        rate.current = false;
        this.rateSvc.updateRate(rate)
        .subscribe({
          next: () => {
            Swal.fire(
              'Borrado!',
              `La tarifa ${rate.name} ha sido eliminada.`,
              'success'
            );
          },
          error: err => {
            Swal.fire(
              'Ups!',
              `La tarifa ${rate.name} no ha podido ser eliminada.`,
              'error'
            );
          },
        });
      }
    });
  }

  // Download PDF with data info
  downloadReport() {

    const data: RateData[] = [];

    const rates = this.dataSource.data;
    rates.forEach(
      (rate: Rate) => {
        data.push(this.getReportData(rate));
      });

    const dataTitle = ``;
    this.scriptSvc.downloadRatesReports(
      `Tarifas Actuales.pdf`,
      'Tarifas Actuales',
      data,
    );
  }

  private getReportData(rate: Rate): RateData {

    const name: string = rate.name;
    const type: string = rate.type;
    const price = rate.price;
    const studentNames = [];
    rate.students.forEach(student => {
      studentNames.push(student.displayName);
    });

    return {
      name,
      type,
      price,
      studentNames
    };
  }


}
