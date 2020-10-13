import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Guild } from '@core/models/guild';
import { GuildChannel } from '@core/models/guildChannel';

@Component({
  selector: 'app-channel-selector',
  templateUrl: './channel-selector.component.html',
  styleUrls: ['./channel-selector.component.scss']
})
export class ChannelSelectorComponent implements OnInit {
  @Input()
  guild: Guild

  @Output()
  channelSelect = new EventEmitter<GuildChannel>();

  selected: GuildChannel;
  constructor() { }

  ngOnInit(): void {
  }

  onVoiceChannelSelected(channel: GuildChannel) {
    this.selected = channel;
    this.channelSelect.emit(channel);
  }
}
