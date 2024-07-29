import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/core/layout/services/http.service';
import { endPoint } from '../constants/api-route.constants';
import { Observable } from 'rxjs';
import { User } from '../../auth/models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpService) {}

  public getUsersList(): Observable<User> {
    return this.http.get(endPoint.usersList);
  }

  public createNewUser(userInfo: any): Observable<User> {
    return this.http.post(endPoint.usersList, userInfo);
  }

  public deleteUser(userInfo: any): Observable<any> {
    return this.http.delete(endPoint.deleteUser(userInfo?._id));
  }

  public updateUser(userInfo: any , id:number): Observable<any> {
    return this.http.put(endPoint.deleteUser(id), userInfo);
  }
}
