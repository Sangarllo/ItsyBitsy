import { Component, Input } from '@angular/core';
import { UserDetails } from '../../models/user.model';

@Component({
  selector: 'sh-user-list-chips',
  templateUrl: './sh-user-list-chips.component.html',
  styleUrls: ['./sh-user-list-chips.component.scss']
})
export class ShUserListChipsComponent {

  @Input() userList: UserDetails[];

  constructor() { }
}
