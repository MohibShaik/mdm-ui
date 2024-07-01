import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from 'src/app/core/layout/services/http.service';
import { endPoint } from '../constants/api-route.constants';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpService) {}

  private API = 'http://localhost:8080/api/auth/signin';

  login(userInfo: User): Observable<any> {
    return this.http.post(endPoint.login, userInfo);
  }

  public isAuthenticated(): boolean {
    const accessToken = sessionStorage.getItem('accessToken')!;
    return !!accessToken;
  }
}
