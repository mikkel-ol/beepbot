import { Component, OnDestroy, OnInit } from '@angular/core';
import { SoundboardSignalrService } from '../services/soundboard-signalr.service';

@Component({
  selector: 'app-soundboard',
  templateUrl: './soundboard.component.html',
  styleUrls: ['./soundboard.component.scss']
})
export class SoundboardComponent implements OnInit, OnDestroy {

  constructor(private signalrService: SoundboardSignalrService) { }

  async ngOnInit() {
    await this.signalrService.startConnection();
  }

  ngOnDestroy() {
    this.signalrService.stopConnection();
  }
}
