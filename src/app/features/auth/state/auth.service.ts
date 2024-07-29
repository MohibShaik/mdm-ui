import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { HttpService } from 'src/app/core/layout/services/http.service';
import { endPoint } from '../constants/api-route.constants';
import { User } from '../models/user.model';
import { authStore } from './auth.store';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpService, private store: authStore) {}

  private API = 'http://localhost:8080/api/auth/signin';

  login(userInfo: User): Observable<any> {
    return this.http.post(endPoint.login, userInfo);
  }

  public getUserInfoById(userId: string): Observable<any> {
    return this.http.get(endPoint.getUserInfoById(userId)).pipe(
      tap((response: any) => {
        this.store.update({ currentUserInfo: response?.data });
      })
    );
  }

  public isAuthenticated(): boolean {
    const accessToken = sessionStorage.getItem('accessToken')!;
    return !!accessToken;
  }
}
