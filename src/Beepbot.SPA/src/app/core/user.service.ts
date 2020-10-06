import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { User } from './models/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = `${environment.apiRoot}`;

  constructor(private http: HttpClient) {}

  getMe(): Observable<User> {
    return sessionStorage.getItem('user')
      ? of(JSON.parse(sessionStorage.getItem('user')))
      : this.http.get(`${this.apiUrl}/users/@me`).pipe(
          tap((user: User) => {
            sessionStorage.setItem('user', JSON.stringify(user));
          })
        );
  }
}
