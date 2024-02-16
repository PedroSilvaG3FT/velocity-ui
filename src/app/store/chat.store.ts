import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { ISubjectMessagesTree } from '../modules/chat/interfaces/chat.interface';
import { PersistService } from './@persist/persist.service';

const persistService = new PersistService('chat');
const state = persistService.initState({
  selectedIdeId: 0,
  selectedModuleId: 0,
  selectedSubjectId: 86,
  selectedLanguageId: 0,
  selectedSubmoduleId: 0,
  selectedFrameworkId: 0,
  subjectMessages: {} as ISubjectMessagesTree,
});

export const ChatStore = signalStore(
  { providedIn: 'root' },
  withState(state),

  withMethods((store) => ({
    setIdeId(selectedIdeId) {
      patchState(store, { selectedIdeId });
      persistService.commit(store, state);
    },
    setModuleId(selectedModuleId) {
      patchState(store, { selectedModuleId });
      persistService.commit(store, state);
    },
    setSubmoduleId(selectedSubmoduleId) {
      patchState(store, { selectedSubmoduleId });
      persistService.commit(store, state);
    },
    setLanguageId(selectedLanguageId) {
      patchState(store, { selectedLanguageId });
      persistService.commit(store, state);
    },
    setFrameworkId(selectedFrameworkId) {
      patchState(store, { selectedFrameworkId });
      persistService.commit(store, state);
    },
    setSubjectId(selectedSubjectId) {
      patchState(store, { selectedSubjectId });
      persistService.commit(store, state);
    },
  }))
);
