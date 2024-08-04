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
  constructor(private service: AuthService, private query: authQuery) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.service.getUserInfoById(this.query.currentUserInfo?._id);
  }
}
