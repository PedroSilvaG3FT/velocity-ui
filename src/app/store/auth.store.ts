import { computed } from '@angular/core';
import {
  patchState,
  signalStore,
  withComputed,
  withMethods,
  withState,
} from '@ngrx/signals';
import { PersistService } from './@persist/persist.service';

const persistService = new PersistService('auth');
const state = persistService.initState({
  token: '',
});

export const AuthStore = signalStore(
  { providedIn: 'root' },
  withState(state),
  withComputed((state) => ({
    isLogged: computed(() => !!state.token),
  })),
  withMethods((store) => ({
    setToken(token: string) {
      patchState(store, { token });
      persistService.commit(store, state);
    },
  }))
);
