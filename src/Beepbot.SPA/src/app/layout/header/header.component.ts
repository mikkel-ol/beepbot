import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Guild } from '@core/models/guild';
import { AuthService } from '@core/services/auth.service';
import { GuildsService } from '@core/services/guilds.service';
import { UserService } from '@core/services/user.service';
import { Observable } from 'rxjs';

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
  selected$: Observable<Guild>;

  constructor(private userService: UserService, private auth: AuthService, private guildsService: GuildsService) {
    this.userService.user$.subscribe((user) => {
      this.name = user.username.substring(0, user.username.indexOf('#'));
      this.discriminator = user.username.substring(user.username.indexOf('#'));
      this.avatarUrl = user.avatar;
      this.selected$ = this.guildsService.selected$;
    });
  }

  handleSignout() {
    this.auth.logout();
  }
}
