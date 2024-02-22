import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import {
  provideHttpClient,
  withFetch,
  withInterceptors,
} from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {
  CLIPBOARD_OPTIONS,
  ClipboardButtonComponent,
  provideMarkdown,
} from 'ngx-markdown';
import { routes } from './app.routes';
import { MICROSOFT_PROVIDERS } from './modules/@shared/config/microsoft.config';
import { HttpInterceptor } from './modules/@shared/interceptors/http.interceptor';
import { ChatSetupFacade } from './modules/chat/facedes/chat-setup.facede';

import 'prismjs';
import 'prismjs/components/prism-typescript.min.js';
import 'prismjs/plugins/line-highlight/prism-line-highlight.js';
import 'prismjs/plugins/line-numbers/prism-line-numbers.js';
import { StoreService } from './modules/@shared/services/store.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimationsAsync(),
    provideHttpClient(withFetch(), withInterceptors([HttpInterceptor])),
    provideMarkdown({
      clipboardOptions: {
        provide: CLIPBOARD_OPTIONS,
        useValue: { buttonComponent: ClipboardButtonComponent },
      },
    }),

    StoreService,
    ChatSetupFacade,
    ...MICROSOFT_PROVIDERS,
  ],
};
