import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from 'src/app/core/layout/services/http.service';
import { User } from '../../auth/models/user.model';
import { endPoint } from '../constants/api-route.constants';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CustomersService {
  constructor(private http: HttpService, private httpClient: HttpClient) {}

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

  public searchOptions(query: string): Observable<any[]> {
    const myHeaders = new Headers();
    myHeaders.append('apikey', 'ZPbwnrM02mr4wUfqgPWcHRXxxBzesuDl');
    return this.httpClient.get<any[]>(
      `https://api.apilayer.com/skills?q=${query}`
    );
  }
}
