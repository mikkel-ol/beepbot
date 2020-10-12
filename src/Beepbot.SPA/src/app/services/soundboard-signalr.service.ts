import { Injectable } from '@angular/core';
import * as signalR from '@aspnet/signalr';
import { HubConnectionBuilder } from '@aspnet/signalr';
import { environment } from '@env/environment';
import { SignalrService } from './signalr.service';

@Injectable({
  providedIn: 'root'
})
export class SoundboardSignalrService extends SignalrService {
  private readonly playSoundTopic = "PlaySound";

  constructor() {
    super();
  }

  public async startConnection() {
    this.hubConnection = new HubConnectionBuilder()
      .withUrl(`${environment.hubRoot}/soundboard`, {
        skipNegotiation: true,
        transport: signalR.HttpTransportType.WebSockets,
      })
      .build();

    try {
      await this.hubConnection
        .start();
      this.attachHandlers();
      this.hubConnection.onclose((err) => {
        if (!err) {
          return;
        }
        setTimeout(this.startConnection, 5000);
      });
    } catch (err) {
      setTimeout(this.startConnection, 5000);
    }
  }

  public play(voiceChannelId: string, soundId: number) {
    this.hubConnection.send(this.playSoundTopic, { voiceChannelId, soundId });
  }
}
