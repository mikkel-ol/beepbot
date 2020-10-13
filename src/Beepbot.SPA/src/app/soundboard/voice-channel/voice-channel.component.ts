import { Component, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import { GuildChannel } from '@core/models/guildChannel';

@Component({
  selector: 'app-voice-channel',
  templateUrl: './voice-channel.component.html',
  styleUrls: ['./voice-channel.component.scss'],
})
export class VoiceChannelComponent implements OnInit {
  @Input()
  channel: GuildChannel;
  @Input()
  selected: boolean;

  @Output()
  onClick = new EventEmitter<GuildChannel>();

  constructor() {}

  ngOnInit(): void {}

  click() {
    this.onClick.emit(this.channel);
  }
}
