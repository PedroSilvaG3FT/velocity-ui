import { HTTP_INTERCEPTORS } from '@angular/common/http';
import {
  MSAL_INSTANCE,
  MsalBroadcastService,
  MsalGuard,
  MsalInterceptor,
  MsalService,
} from '@azure/msal-angular';
import {
  BrowserCacheLocation,
  IPublicClientApplication,
  PublicClientApplication,
} from '@azure/msal-browser';
import { environment } from '../../../../environments/environment';

function factory(): IPublicClientApplication {
  const config = new PublicClientApplication({
    auth: {
      redirectUri: '/',
      postLogoutRedirectUri: '/',
      clientId: environment.microsoft.client_id,
      authority: `https://login.microsoftonline.com/${environment.microsoft.tenant_id}`,
    },
    system: { allowNativeBroker: false },
    cache: { cacheLocation: BrowserCacheLocation.LocalStorage },
  });

  return config;
}

export const MICROSOFT_PROVIDERS = [
  MsalGuard,
  MsalService,
  MsalBroadcastService,
  { provide: MSAL_INSTANCE, useFactory: factory },
  { multi: true, useClass: MsalInterceptor, provide: HTTP_INTERCEPTORS },
];
