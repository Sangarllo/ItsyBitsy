import { Component, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '@models/user.model';
import { AuthService } from '@services/auth.service';

@Component({
  selector: 'app-send-email',
  templateUrl: './send-email.component.html',
  styleUrls: ['./send-email.component.scss'],
})
export class SendEmailComponent implements OnDestroy {
  public user$: Observable<User> = this.authSvc.afAuth.user;

  constructor(private authSvc: AuthService) {}

  onSendEmail(): void {
    this.authSvc.sendVerificationEmail();
  }

  ngOnDestroy() {
    // this.authSvc.logout();
  }
}
