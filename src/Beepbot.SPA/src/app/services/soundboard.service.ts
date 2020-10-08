import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Sound } from '@core/models/sound';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class SoundboardService {

  constructor(private http: HttpClient) { }

  get sounds$() {
    return this.http.get<Array<Sound>>(`${environment.apiRoot}/soundboard`);
  }  
}
