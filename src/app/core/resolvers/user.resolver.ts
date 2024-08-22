import { Injectable } from '@angular/core';
import {
  Router,
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { authQuery } from 'src/app/features/auth/state/auth.query';
import { AuthService } from 'src/app/features/auth/state/auth.service';

@Injectable({
  providedIn: 'root',
})
export class UserResolver implements Resolve<boolean> {
  public userId!: string;
  constructor(private service: AuthService, private query: authQuery) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    this.userId = this.query.currentUserInfo
      ? this.query.currentUserInfo?._id
      : sessionStorage.getItem('id');
    return this.service.getUserInfoById(this.userId);
  }
}
