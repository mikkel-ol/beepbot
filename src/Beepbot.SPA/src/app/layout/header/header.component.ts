import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AuthService } from '@core/auth.service';
import { UserService } from '@core/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  @Input() isSmallScreen: boolean;

  @Output() toggleSidenav = new EventEmitter<void>();

  name: string;
  discriminator: string;
  avatarUrl: string;

  constructor(private userService: UserService, private auth: AuthService) {
    this.userService.user$.subscribe((user) => {
      this.name = user.username.substring(0, user.username.indexOf('#'));
      this.discriminator = user.username.substring(user.username.indexOf('#'));
      this.avatarUrl = user.avatar;
    });
  }

  handleSignout() {
    this.auth.logout();
  }
}
