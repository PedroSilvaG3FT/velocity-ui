import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import {
  IChatSetupModuleItem,
  IChatSetupOptionsItem,
} from '../modules/chat/interfaces/chat-setup.interface';
import { PersistService } from './@persist/persist.service';

const persistService = new PersistService('chat-setup');
const state = persistService.initState({
  ides: [] as IChatSetupOptionsItem[],
  modules: [] as IChatSetupModuleItem[],
  languages: [] as IChatSetupOptionsItem[],
  frameworks: [] as IChatSetupOptionsItem[],
});

export const ChatSetupStore = signalStore(
  { providedIn: 'root' },
  withState(state),
  withMethods((store) => ({
    setIDEs(ides) {
      patchState(store, { ides });
      persistService.commit(store, state);
    },
    setModules(modules) {
      patchState(store, { modules });
      persistService.commit(store, state);
    },
    setLanguages(languages) {
      patchState(store, { languages });
      persistService.commit(store, state);
    },
    setFrameworks(frameworks) {
      patchState(store, { frameworks });
      persistService.commit(store, state);
    },
  }))
);
