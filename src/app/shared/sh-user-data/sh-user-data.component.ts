import { Component, Input } from '@angular/core';
import { UserDetails } from '../../models/user.model';

@Component({
  selector: 'app-sh-user-data',
  templateUrl: './sh-user-data.component.html',
  styleUrls: ['./sh-user-data.component.scss']
})
export class ShUserDataComponent {

  @Input() userDetails: UserDetails;

  constructor(
  ) { }
}
