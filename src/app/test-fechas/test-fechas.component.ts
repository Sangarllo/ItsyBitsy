import { Component } from '@angular/core';

@Component({
  selector: 'app-test-fechas',
  templateUrl: './test-fechas.component.html',
  styleUrls: ['./test-fechas.component.scss']
})
export class TestFechasComponent {

  today = Date.now();
}
