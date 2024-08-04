import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { HttpService } from 'src/app/core/layout/services/http.service';
import { User } from '../../auth/models/user.model';
import { endPoint } from '../constants/api-route.constants';
import { HttpClient } from '@angular/common/http';
import { authStore } from '../../auth/state/auth.store';

@Injectable({
  providedIn: 'root',
})
export class CustomersService {
  constructor(
    private http: HttpService,
    private httpClient: HttpClient,
    private store: authStore
  ) {}

  public getEmployeesList(
    pageIndex: number,
    pageSize: number,
    vendorInfo: any
  ): Observable<any> {
    return this.http.post(
      endPoint.employeesList(pageIndex, pageSize),
      vendorInfo
    );
  }

  public createNewCust(customerInfo: any): Observable<any> {
    return this.http.post(endPoint.newEmployee, customerInfo);
  }

  public deleteUser(userInfo: any): Observable<any> {
    return this.http.delete(endPoint.deleteUser(userInfo?.id));
  }

  public updateCustomer(customerInfo: any, id: number): Observable<any> {
    return this.http.put(endPoint.updateCustomer(id), customerInfo);
  }

  public searchSkills(query: string): Observable<any[]> {
    const myHeaders = new Headers();
    myHeaders.append('apikey', 'ZPbwnrM02mr4wUfqgPWcHRXxxBzesuDl');
    return this.httpClient.get<any[]>(
      `https://api.apilayer.com/skills?q=${query}`
    );
  }

  public getEmpDetailsById(emplId: string): Observable<any> {
    return this.http.get(endPoint.getEmpInfo(emplId)).pipe(
      tap((response: any) => {
        // this.store.update({ currentUserInfo: response?.data });
      })
    );
  }

  public updateEmpAvailability(empInfo: any): Observable<any> {
    return this.http.post(endPoint.updateEmpAvailability, empInfo);
  }
}
