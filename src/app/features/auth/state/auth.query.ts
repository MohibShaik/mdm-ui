import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { authState, authStore } from './auth.store';
import { of } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class authQuery extends Query<authState> {
  constructor(store: authStore) {
    super(store);
  }

  get currentUserInfo() {
    return this.getValue().currentUserInfo;
  }
  currentUserInfo$ = this.select((u) => u.currentUserInfo);
  empDetailsById$ = this.select((u) => u.empDetailsById);
  allCountriesList$ = this.select((u) => u.allCountriesList);
  departmentOptions$ = this.select((u) => u.departmentOptions);
  jobFilters$ = this.select((u) => u.jobFilters);
}
