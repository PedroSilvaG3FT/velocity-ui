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
const initialState = {
  token: '',
  tokenType: '',
  userData: {} as IUserData,
  microsoftUser: {} as AuthenticationResult,
};

const state = persistService.initState(initialState);

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
    requestHeaderToken: computed(() => {
      if (state.token() && state.tokenType())
        return `${state.tokenType()} ${state.token()}`;
      else return ``;
    }),
    shortUserName: computed(() => {
      const name = state.userData().name;

      if (!name) return '';

      const splitedName = name.split(' ');

      const firstName = splitedName[0];
      const lastName = splitedName[splitedName.length - 1];

      if (firstName === lastName) return firstName;
      else return `${firstName} ${lastName}`;
    }),
  })),
  withMethods((store) => ({
    setToken(token: string) {
      patchState(store, { token });
      persistService.commit(store, state);
    },
    setTokenType(tokenType: string) {
      patchState(store, { tokenType });
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
    reset() {
      patchState(store, { ...initialState });
      persistService.commit(store, state);
    },
  }))
);
