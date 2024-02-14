import { Routes } from '@angular/router';

export const CHAT_ROUTES: Routes = [
  {
    path: 'chat',
    loadComponent: () =>
      import('../components/layout/layout.component').then(
        (c) => c.LayoutComponent
      ),
    children: [
      {
        path: '',
        data: { id: 'chat', title: 'Chat' },
        loadComponent: () =>
          import('./chat/chat.component').then((c) => c.ChatComponent),
      },
      {
        path: 'history',
        data: { id: 'chat-history', title: 'History' },
        loadComponent: () =>
          import('./history/history.component').then((c) => c.HistoryComponent),
      },
    ],
  },
];
