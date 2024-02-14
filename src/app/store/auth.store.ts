import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { PersistService } from './@persist/persist.service';

const persistService = new PersistService('auth');
const state = persistService.initState({
  token: '',
});

export const AuthStore = signalStore(
  { providedIn: 'root' },
  withState(state),
  withMethods((store) => ({
    setToken(token: string) {
      patchState(store, { token });
      persistService.commit(store, state);
    },
  }))
);
