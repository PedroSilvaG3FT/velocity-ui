import { Routes } from '@angular/router';
import { AUTHENTICATION_ROUTES } from './modules/authentication/pages/routes';
import { CHAT_ROUTES } from './modules/chat/pages/routes';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth/sign-in',
    pathMatch: 'full',
  },
  ...CHAT_ROUTES,
  ...AUTHENTICATION_ROUTES,
];
