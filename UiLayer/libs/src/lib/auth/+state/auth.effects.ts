import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError, tap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import * as AuthActions from './auth.actions';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Injectable()
export class AuthEffects {
  private readonly actions$ = inject(Actions);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly messageService = inject(MessageService);

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.login),
      mergeMap(({ email, password }) =>
        this.authService.login({ email, password }).pipe(
          map((response) => AuthActions.loginSuccess(response)),
          catchError((error) =>
            of(AuthActions.loginFailure({ error: error.message }))
          )
        )
      )
    )
  );

  signup$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.signup),
      mergeMap(({ userData }) =>
        this.authService.register(userData).pipe(
          map((response) => {
            this.messageService.add({
              severity: 'success',
              summary: 'Signup Successful',
              detail: `Welcome to the app, ${userData.FullName}!`,
            });
            return AuthActions.signupSuccess(response);
          }),
          catchError((error) =>
            of(AuthActions.signupFailure({ error: error.message }))
          )
        )
      )
    )
  );

  loginSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.loginSuccess),
        tap(({ user }) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Login Successful',
            detail: `Welcome back, ${user.FullName}!`,
          });
          this.router.navigate(['/trainee/services']);
        })
      ),
    { dispatch: false }
  );

  logout$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.logout),
        tap(() => {
          this.router.navigate(['/login']);
          this.messageService.add({
            severity: 'success',
            summary: 'Logout Successful',
            detail: `Logged out successfully`,
          });
        })
      ),
    { dispatch: false }
  );
}
