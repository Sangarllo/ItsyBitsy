import { Component, OnInit, ViewChild, AfterViewInit} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { Rate } from '../../models/rate';
import { RateService } from '../../services/rates.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-rates-view',
  templateUrl: './rates-view.component.html',
  styleUrls: ['./rates-view.component.scss']
})
export class RatesView implements OnInit, AfterViewInit {

  columnsToDisplay = ['name', 'type', 'price', 'actions'];
  dataSource = new MatTableDataSource();
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(
    private router: Router,
    private rateSvc: RateService
  ) { }

  ngOnInit() {
    this.rateSvc.getAllRates().subscribe(
      (rates: Rate[]) => {
        this.dataSource.data = rates;
    });
  }

  ngAfterViewInit(): void {
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

}
