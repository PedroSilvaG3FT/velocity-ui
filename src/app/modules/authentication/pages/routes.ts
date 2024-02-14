import { Routes } from '@angular/router';

export const AUTHENTICATION_ROUTES: Routes = [
  {
    path: 'auth',
    children: [
      {
        path: 'sign-in',
        data: { id: 'sign-in', title: 'Sign in' },
        loadComponent: () =>
          import('./sign-in/sign-in.component').then((c) => c.SignInComponent),
      },
      {
        path: 'sign-up',
        data: { id: 'sign-up', title: 'Sign up' },
        loadComponent: () =>
          import('./sign-up/sign-up.component').then((c) => c.SignUpComponent),
      },
    ],
  },
];
