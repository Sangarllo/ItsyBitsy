import { Component, Input } from '@angular/core';
import { UserDetails } from '../../models/user.model';


@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.scss']
})
export class UserViewComponent {

  @Input() userDetails: UserDetails;

  constructor(
  ) { }
}
