import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError, tap } from 'rxjs/operators';
import { AuthService } from '../../services/auth.service';
import * as AuthActions from './auth.actions';
import { Router } from '@angular/router';
import { AuthResponse } from './auth.model';
import { MessageService } from 'primeng/api';

@Injectable()
export class AuthEffects {
  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.login),
      mergeMap(({ email, password }) =>
        this.authService.login({ email, password }).pipe(
          map((response: AuthResponse) => AuthActions.loginSuccess(response)),
          catchError((error) =>
            of(AuthActions.loginFailure({ error: error.message }))
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
            life: 3000,
          });
          this.router.navigate(['/']);
        })
      ),
    { dispatch: false }
  );

  loginFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.loginFailure),
        tap(({ error }) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Login Failed',
            detail: error,
            life: 3000,
          });
        })
      ),
    { dispatch: false }
  );

  signup$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.signup),
      mergeMap(({ userData }) =>
        this.authService.register(userData).pipe(
          map((response: AuthResponse) => AuthActions.signupSuccess(response)),
          catchError((error) =>
            of(AuthActions.signupFailure({ error: error.message }))
          )
        )
      )
    )
  );

  signupSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.signupSuccess),
        tap(({ user }) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Registration Successful',
            detail: `Welcome to FitnessAIx, ${user.FullName}!`,
            life: 3000,
          });
          this.router.navigate(['/']);
        })
      ),
    { dispatch: false }
  );

  signupFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.signupFailure),
        tap(({ error }) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Registration Failed',
            detail: error,
            life: 3000,
          });
        })
      ),
    { dispatch: false }
  );

  logout$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.logout),
        tap(() => {
          localStorage.removeItem('token');
          this.messageService.add({
            severity: 'info',
            summary: 'Logged Out',
            detail: 'You have been successfully logged out',
            life: 3000,
          });
          this.router.navigate(['/login']);
        })
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router,
    private messageService: MessageService
  ) {}
}
