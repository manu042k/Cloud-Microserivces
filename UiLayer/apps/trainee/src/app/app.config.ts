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
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideAnimations } from '@angular/platform-browser/animations';
import { providePrimeNG } from 'primeng/config';
import { MyPreset } from 'mytheme';
import { MessageService } from 'primeng/api';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { httpHeadersInterceptor } from './core/interceptors/http-headers.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideStore(), // Root Store
    provideState('auth', authReducer), // Feature State
    provideEffects(AuthEffects),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
    provideRouter(appRoutes),
    provideHttpClient(withInterceptors([httpHeadersInterceptor])),
    provideAnimations(),
    providePrimeNG({
      theme: {
        preset: MyPreset,
      },
    }),
    MessageService,
  ],
};
