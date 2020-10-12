import { Component, OnInit } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';
import { Guild } from '@core/models/guild';
import { GuildsService } from '@core/services/guilds.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-nav-header',
  templateUrl: './nav-header.component.html',
  styleUrls: ['./nav-header.component.scss']
})
export class NavHeaderComponent implements OnInit {
  selected$: Observable<Guild>;
  guilds$: Observable<Array<Guild>>;

  constructor(private guildsService: GuildsService) { }

  ngOnInit(): void {
    this.guilds$ = this.guildsService.guilds$;
    this.selected$ = this.guildsService.selected$;
  }

  onGuildSelect(e: MatSelectChange) {
    this.guildsService.setSelected(e.value);
  }
}
