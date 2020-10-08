import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Server } from './models/server';
import { User } from './models/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = `${environment.apiRoot}`;

  constructor(private http: HttpClient) {}

  get user$(): Observable<User> {
    return sessionStorage.getItem('user')
      ? of(JSON.parse(sessionStorage.getItem('user')))
      : this.http.get(`${this.apiUrl}/users/@me`).pipe(
          tap((user: User) => {
            sessionStorage.setItem('user', JSON.stringify(user));
          })
        );
  }

  get servers$(): Observable<Array<Server>> {
    return this.http.get<Array<Server>>(`${this.apiUrl}/servers`);
  }
}
