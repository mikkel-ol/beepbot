import { Component, OnInit } from '@angular/core';
import { Server } from '@core/models/server';
import { UserService } from '@core/user.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-nav-header',
  templateUrl: './nav-header.component.html',
  styleUrls: ['./nav-header.component.scss']
})
export class NavHeaderComponent implements OnInit {
  servers$: Observable<Array<Server>>;

  foods = [
    {
      title: "1"
    },
    {
      title: "2"
    }
  ]

  selected = this.foods[1].title;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.servers$ = this.userService.servers$;
  }

}
