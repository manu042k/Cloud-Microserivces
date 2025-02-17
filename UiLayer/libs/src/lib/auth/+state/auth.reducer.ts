import { createReducer, on } from '@ngrx/store';
import * as AuthActions from './auth.actions';
import { initialState } from './auth.model';

export const authReducer = createReducer(
  initialState,
  on(AuthActions.loginSuccess, (state, { token, user }) => ({
    ...state,
    user,
    token,
    isAuthenticated: true,
    error: null,
  })),
  on(AuthActions.loginFailure, (state, { error }) => ({
    ...state,
    error,
    isAuthenticated: false,
  })),
  on(AuthActions.signupSuccess, (state, { token, user }) => ({
    ...state,
    user,
    token,
    isAuthenticated: true,
    error: null,
  })),
  on(AuthActions.signupFailure, (state, { error }) => ({
    ...state,
    error,
    isAuthenticated: false,
  })),
  on(AuthActions.logout, () => initialState)
);
