import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Sound } from '@core/models/sound';
import { BehaviorSubject, Observable } from 'rxjs';
import { SoundboardSignalrService } from '../services/soundboard-signalr.service';
import { GuildsService } from '@core/services/guilds.service';
import { Guild } from '@core/models/guild';
import { GuildChannel } from '@core/models/guildChannel';

@Component({
  selector: 'app-soundboard',
  templateUrl: './soundboard.component.html',
  styleUrls: ['./soundboard.component.scss'],
})
export class SoundboardComponent implements OnInit {
  @ViewChild('file')
  fileInput: ElementRef;

  sounds$: Observable<Array<Sound>>;
  selected$: Observable<Guild>;
  selectedVoiceChannel: GuildChannel;
  isConnectedToVoice: boolean;

  constructor(
    private signalrService: SoundboardSignalrService,
    private guildService: GuildsService
  ) {}

  async ngOnInit() {
    await this.signalrService.startConnection();
    this.sounds$ = this.guildService.sounds$;
    this.selected$ = this.guildService.selected$;
  }

  ngOnDestroy() {
    this.signalrService.stopConnection();
  }

  play(soundId: number) {
    if (!this.selectedVoiceChannel) {
      // show error
      return;
    }
    this.signalrService.play(this.selectedVoiceChannel.id, soundId);
    this.isConnectedToVoice = true;
  }

  handleFileInput(files: FileList) {
   this.selected$.subscribe(guild => {
      Array.from(files).forEach(file => {
        this.guildService.uploadAudioForGuild(guild.id, file);
      });
    })

    this.fileInput.nativeElement.value = "";
  }

  channelSelected(channel: GuildChannel) {
    this.selectedVoiceChannel = channel;
  }

  disconnect(guildId: string) {
    this.signalrService.disconnect(guildId);
    this.isConnectedToVoice = false;
  }
}
