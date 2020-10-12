import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Guild } from '@core/models/guild';
import { Sound } from '@core/models/sound';
import { environment } from '@env/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class GuildsService {
  private apiUrl = `${environment.apiRoot}`;
  private selected = new BehaviorSubject<Guild>(null);
  private sounds = new BehaviorSubject<Array<Sound>>(null);

  constructor(private http: HttpClient) {}

  get guilds$() {
    return this.http.get<Array<Guild>>(`${this.apiUrl}/guilds`).pipe(
      tap((guilds) =>
        guilds.map((guild) => {
          if (!guild.avatar) {
            guild.avatar = this.generateAvatar();
          }
        })
      ),
      tap((guilds) => this.setSelected(guilds[0]))
    );
  }

  get sounds$() {
    return this.sounds.asObservable();
  }

  get selected$(): Observable<Guild> {
    return this.selected.asObservable();
  }

  setSelected(guild: Guild) {
    this.selected.next(guild);
    this.http
      .get<Array<Sound>>(
        `${this.apiUrl}/guilds/${this.selected.value.id}/sounds`
      )
      .subscribe((sounds) => this.sounds.next(sounds));
  }

  uploadAudioForGuild(guildId: string, audio: File) {
    const formData = new FormData();
    formData.set('file', audio, audio.name);

    this.http
      .post(`${this.apiUrl}/guilds/${guildId}/sounds`, formData)
      .subscribe((sound: Sound) => {
        this.sounds.next([...this.sounds.getValue(), sound]);
      });
  }

  private generateAvatar(): string {
    return 'hej';
  }
}
