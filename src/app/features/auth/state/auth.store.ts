import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';

export interface authState {
  currentUserInfo?: any;
}

export function createInitialState(): authState {
  return {};
}

@Injectable({
  providedIn: 'root',
})
@StoreConfig({ name: 'auth' })
export class authStore extends Store<authState> {
  constructor() {
    super(createInitialState());
  }
}
