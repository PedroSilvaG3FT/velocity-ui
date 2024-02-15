import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { routes } from './app.routes';
import { MICROSOFT_PROVIDERS } from './modules/@shared/config/microsoft.config';
import { ChatSetupFacade } from './modules/chat/facedes/chat-setup.facede';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimationsAsync(),
    provideHttpClient(withFetch()),

    ChatSetupFacade,
    ...MICROSOFT_PROVIDERS,
  ],
};
