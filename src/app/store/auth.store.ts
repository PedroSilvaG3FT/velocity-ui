import { computed } from '@angular/core';
import { AuthenticationResult } from '@azure/msal-browser';
import {
  patchState,
  signalStore,
  withComputed,
  withMethods,
  withState,
} from '@ngrx/signals';
import { IUserData } from '../modules/@shared/interfaces/user.interface';
import { PersistService } from './@persist/persist.service';

const persistService = new PersistService('auth');
const state = persistService.initState({
  token: '',
  userData: {} as IUserData,
  microsoftUser: {} as AuthenticationResult,
});

export const AuthStore = signalStore(
  { providedIn: 'root' },
  withState(state),
  withComputed((state) => ({
    isLogged: computed(() => {
      return (
        !!state.token() ||
        !!Object.keys(state.userData()).length ||
        !!Object.keys(state.microsoftUser()).length
      );
    }),
  })),
  withMethods((store) => ({
    setToken(token: string) {
      patchState(store, { token });
      persistService.commit(store, state);
    },
    setUserData(userData: IUserData) {
      patchState(store, { userData });
      persistService.commit(store, state);
    },
    setMicrosoftUser(microsoftUser: AuthenticationResult) {
      patchState(store, { microsoftUser });
      persistService.commit(store, state);
    },
  }))
);
