import {
  ApplicationConfig,
  importProvidersFrom,
  isDevMode,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { providePrimeNG } from 'primeng/config';
import { MyPreset } from './mytheme';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { errorHandlerInterceptor } from './core/interceptors/error-handler.interceptor';
import { provideStore, provideState } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { AuthModule, authReducer, AuthEffects } from '@ui-layer/auth';
import { httpHeadersInterceptor } from './core/interceptors/http-headers.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideStore(), // Root Store
    provideState('auth', authReducer), // Feature State
    provideEffects(AuthEffects),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
    provideRouter(appRoutes),
    provideHttpClient(
      withInterceptors([errorHandlerInterceptor, httpHeadersInterceptor])
    ),
    provideAnimations(),
    providePrimeNG({
      theme: {
        preset: MyPreset,
      },
    }),
    MessageService,
  ],
};
