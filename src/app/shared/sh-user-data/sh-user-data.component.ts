import { Component, Input } from '@angular/core';
import { UserDetails, User } from '@models/user.model';

@Component({
  selector: 'app-sh-user-data',
  templateUrl: './sh-user-data.component.html',
  styleUrls: ['./sh-user-data.component.scss']
})
export class ShUserDataComponent {

  @Input() userDetails: UserDetails;
  @Input() user: User;
}
