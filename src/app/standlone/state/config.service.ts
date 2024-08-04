import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { IUserType } from '../models/user-type';
import { authStore } from 'src/app/features/auth/state/auth.store';

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  private configUrl = 'assets/config/user-types.json';

  constructor(private http: HttpClient, private store: authStore) {}

  getConfig(): Observable<IUserType[]> {
    return this.http.get<IUserType[]>(this.configUrl);
  }

  getSideNavLinks(): Observable<IUserType[]> {
    return this.http.get<any[]>('assets/config/side-nav.json');
  }
  getVisaOptions(): Observable<any[]> {
    return this.http.get<any[]>('assets/config/visa-status.json');
  }

  getDepartmentOptions(): Observable<any[]> {
    return this.http.get<any[]>('assets/config/departments.json').pipe(
      tap((response) => {
        this.store.update({ departmentOptions: response });
      })
    );
  }

  getJobFilters(): Observable<any[]> {
    return this.http.get<any[]>('assets/config/job-filters.json').pipe(
      tap((response) => {
        this.store.update({ jobFilters: response });
      })
    );
  }
}
