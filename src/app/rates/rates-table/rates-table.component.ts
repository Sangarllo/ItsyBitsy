import { Component, OnInit, ViewChild, AfterViewInit} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { Rate } from '../../models/rate';
import { RateService } from '../../services/rates.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-rates-table',
  templateUrl: './rates-table.component.html',
  styleUrls: ['./rates-table.component.scss']
})
export class RatesTableComponent implements OnInit, AfterViewInit {

  columnsToDisplay = ['name', 'type', 'price', 'actions'];
  dataSource = new MatTableDataSource();
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(
    private router: Router,
    private rateSvc: RateService
  ) { }

  ngOnInit() {
    this.rateSvc.getRates().subscribe(
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

  viewRate(rate: Rate) {
    this.router.navigate([`${Rate.PATH_URL}/${rate.id}`]);
  }

  editRate(rate: Rate) {
    this.router.navigate([`${Rate.PATH_URL}/${rate.id}/editar`]);
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
        Swal.fire(
          'Borrado!',
          `El usuario ${rate.name} ha sido eliminada.`,
          'success'
        );
      }
    });
  }

}
