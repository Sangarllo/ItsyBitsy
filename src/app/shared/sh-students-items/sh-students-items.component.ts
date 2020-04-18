import { Component, Input } from '@angular/core';
import { UserDetails } from 'src/app/models/user.model';

@Component({
  selector: 'app-sh-students-items',
  templateUrl: './sh-students-items.component.html',
  styleUrls: ['./sh-students-items.component.scss']
})
export class ShStudentsItemsComponent {

  @Input() students: UserDetails[];

}
