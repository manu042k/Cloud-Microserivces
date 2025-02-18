import { Route } from '@angular/router';

export const remoteRoutes: Route[] = [
  {
    path: '',
    loadComponent: () =>
      import('../components/user-display.component').then(
        (m) => m.UserDisplayComponent
      ),
  },
];
