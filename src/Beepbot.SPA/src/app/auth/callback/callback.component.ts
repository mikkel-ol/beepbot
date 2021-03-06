import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '@core/services/user.service';

@Component({
  selector: 'app-callback',
  templateUrl: './callback.component.html',
  styleUrls: ['./callback.component.scss'],
})
export class CallbackComponent implements OnInit {
  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.userService.user$.subscribe(() => {
      sessionStorage.setItem('isLoggedIn', 'true');
      this.router.navigate(['/']);
    });
  }
}
