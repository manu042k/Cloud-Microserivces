import {
  ApplicationConfig,
  isDevMode,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { providePrimeNG } from 'primeng/config';
import { MyPreset } from 'mytheme';
import { MessageService } from 'primeng/api';
import { provideState, provideStore } from '@ngrx/store';
import { AuthEffects, authReducer } from '@ui-layer/auth';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';

export const appConfig: ApplicationConfig = {
  providers: [
    provideStore(),
    provideState('auth', authReducer),
    provideEffects(),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(appRoutes),
    provideAnimations(),
    providePrimeNG({
      theme: {
        preset: MyPreset,
      },
    }),
    MessageService,
  ],
};
