import { Injectable } from '@angular/core';
import { HubConnection } from '@aspnet/signalr';

@Injectable({
  providedIn: 'root',
})
export class SignalrService {
  protected hubConnection: HubConnection;

  public stopConnection() {
    this.hubConnection.stop().then(() => this.removeHandlers());
  }

  protected attachHandlers() {}

  protected removeHandlers() {}
}
