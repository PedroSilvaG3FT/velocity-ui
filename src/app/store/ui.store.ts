import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { ThemeType } from '../modules/@shared/types/theme.type';
import { PersistService } from './@persist/persist.service';

const persistService = new PersistService('ui');
const state = persistService.initState({ theme: 'dark' });

export const UiStore = signalStore(
  { providedIn: 'root' },
  withState(state),
  withMethods((store) => ({
    setTheme(theme: ThemeType) {
      patchState(store, { theme });
      persistService.commit(store, state);
    },
  }))
);
