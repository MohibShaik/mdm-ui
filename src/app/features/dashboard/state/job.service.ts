import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { HttpService } from 'src/app/core/layout/services/http.service';
import { authStore } from '../../auth/state/auth.store';
import { ICountry } from '../models/country';
import { IState } from '../models/state';
import { endPoint } from '../constants/api-route.constants';

@Injectable({
  providedIn: 'root',
})
export class JobService {
  constructor(
    private http: HttpService,
    private tempHttp: HttpClient,
    private store: authStore
  ) {}

  public getCountriesList(): Observable<ICountry[]> {
    return this.tempHttp
      .get<ICountry[]>('https://api.countrystatecity.in/v1/countries')
      .pipe(
        tap((response: any) => {
          // console.log(response);
          this.store.update({ allCountriesList: response });
        })
      );
  }

  public getStatesListByCountry(countryCode: string): Observable<IState[]> {
    return this.tempHttp
      .get<IState[]>(
        `https://api.countrystatecity.in/v1/countries/${countryCode}/states`
      )
      .pipe(tap((response: any) => {}));
  }

  public getCitiesListByCountry(
    countryCode: string,
    stateCode: string
  ): Observable<IState[]> {
    return this.tempHttp
      .get<IState[]>(
        `https://api.countrystatecity.in/v1/countries/${countryCode}/states/${stateCode}/cities`
      )
      .pipe(tap((response: any) => {}));
  }

  public publishNewJob(jobInfo: any): Observable<any> {
    return this.http.post(endPoint.newJob, jobInfo);
  }

  public getJobsList(
    pageIndex: number,
    pageSize: number,
    filters: any
  ): Observable<any> {
    return this.http.post(endPoint.jobsList(pageIndex, pageSize), filters);
  }

  public applyForJob(jobInfo: any): Observable<any> {
    return this.http.post(endPoint.applyForJob, jobInfo);
  }
}
