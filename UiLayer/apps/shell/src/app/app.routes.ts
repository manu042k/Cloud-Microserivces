import { Route } from '@angular/router';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { authGuard } from '@ui-layer/auth';

export const appRoutes: Route[] = [
  {
    path: 'trainer',
    loadChildren: () => import('trainer/Routes').then((m) => m!.remoteRoutes),
    // canActivate: [authGuard],
  },
  {
    path: '',
    loadComponent: () =>
      import('./components/timeline/timeline.component').then(
        (m) => m.TimelineComponent
      ),
  },
  {
    path: 'trainee',
    loadChildren: () => import('trainee/Routes').then((m) => m!.remoteRoutes),
    // canActivate: [authGuard],
  },
  {
    path: 'profile',
    loadChildren: () => import('profile/Routes').then((m) => m!.remoteRoutes),
    canActivate: [authGuard],
  },

  { path: 'sign-in', component: SignInComponent },
  { path: 'sign-up', component: SignUpComponent },
  { path: '**', redirectTo: '' },
];
