import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Guild } from '@core/models/guild';
import { GuildChannel } from '@core/models/guildChannel';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-channel-selector',
  templateUrl: './channel-selector.component.html',
  styleUrls: ['./channel-selector.component.scss']
})
export class ChannelSelectorComponent implements OnInit {
  @Input()
  guild: Guild
  @Input()
  isConnected: boolean;
  @Output()
  channelSelect = new EventEmitter<GuildChannel>();
  @Output()
  disconnect = new EventEmitter();

  selected: GuildChannel;
  constructor() { }

  ngOnInit(): void {
  }

  onVoiceChannelSelected(channel: GuildChannel) {
    this.selected = channel;
    this.channelSelect.emit(channel);
  }

  onDisconnect() {
    this.disconnect.emit(this.guild.id);
  }
}
