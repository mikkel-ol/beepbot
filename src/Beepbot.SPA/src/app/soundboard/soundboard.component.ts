import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Sound } from '@core/models/sound';
import { Observable } from 'rxjs';
import { SoundboardSignalrService } from '../services/soundboard-signalr.service';
import { GuildsService } from '@core/services/guilds.service';

@Component({
  selector: 'app-soundboard',
  templateUrl: './soundboard.component.html',
  styleUrls: ['./soundboard.component.scss'],
})
export class SoundboardComponent implements OnInit {
  @ViewChild('file')
  fileInput: ElementRef;

  sounds$: Observable<Array<Sound>>;

  constructor(
    private signalrService: SoundboardSignalrService,
    private guildService: GuildsService
  ) {}

  async ngOnInit() {
    await this.signalrService.startConnection();
    this.sounds$ = this.guildService.sounds$;
  }

  ngOnDestroy() {
    this.signalrService.stopConnection();
  }

  play(soundId: number) {
    this.signalrService.play('588030636934037516', soundId);
  }

  handleFileInput(files: FileList) {
    this.guildService.selected$.subscribe(guild => {
      Array.from(files).forEach(file => {
        this.guildService.uploadAudioForGuild(guild.id, file);
      });
    })

    this.fileInput.nativeElement.value = "";
  }
}
