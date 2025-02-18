import {
  ApplicationConfig,
  isDevMode,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';
import { provideState, provideStore } from '@ngrx/store';
import { AuthEffects, authReducer } from '@ui-layer/auth';
import { provideEffects } from '@ngrx/effects';
import { MessageService } from 'primeng/api';
import { MyPreset } from 'mytheme';
import { providePrimeNG } from 'primeng/config';
import { provideHttpClient } from '@angular/common/http';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideAnimations } from '@angular/platform-browser/animations';
export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(appRoutes),
    provideStore(), // Root Store
    provideState('auth', authReducer), // Feature State
    provideEffects(AuthEffects),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
    provideRouter(appRoutes),
    provideAnimations(),
    provideHttpClient(),
    providePrimeNG({
      theme: {
        preset: MyPreset,
      },
    }),
    MessageService,
  ],
};
