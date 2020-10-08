import { Component, OnDestroy, OnInit } from '@angular/core';
import { Sound } from '@core/models/sound';
import { Observable } from 'rxjs';
import { SoundboardSignalrService } from '../services/soundboard-signalr.service';
import { SoundboardService } from '../services/soundboard.service';

@Component({
  selector: 'app-soundboard',
  templateUrl: './soundboard.component.html',
  styleUrls: ['./soundboard.component.scss']
})
export class SoundboardComponent implements OnInit, OnDestroy {
  sounds$: Observable<Array<Sound>>;

  constructor(private signalrService: SoundboardSignalrService, private soundboardService: SoundboardService) { }

  async ngOnInit() {
    await this.signalrService.startConnection();
    this.sounds$ = this.soundboardService.sounds$;
  }

  ngOnDestroy() {
    this.signalrService.stopConnection();
  }
}
