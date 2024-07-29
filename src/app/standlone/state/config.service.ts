import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUserType } from '../models/user-type';

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  private configUrl = 'assets/config/user-types.json';

  constructor(private http: HttpClient) {}

  getConfig(): Observable<IUserType[]> {
    return this.http.get<IUserType[]>(this.configUrl);
  }

  getSideNavLinks(): Observable<IUserType[]> {
    return this.http.get<any[]>('assets/config/side-nav.json');
  }
  getVisaOptions(): Observable<any[]> {
    return this.http.get<any[]>('assets/config/visa-status.json');
  }
}
