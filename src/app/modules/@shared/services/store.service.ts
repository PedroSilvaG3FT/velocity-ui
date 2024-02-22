import { Injectable, inject } from '@angular/core';
import { AuthStore } from '../../../store/auth.store';

@Injectable({ providedIn: 'root' })
export class StoreService {
  private authStore = inject(AuthStore);

  public reset() {
    this.authStore.reset();
  }
}
