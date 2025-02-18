import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectIsAuthenticated } from '../+state/auth.selectors';
import { map, tap } from 'rxjs/operators';

export const authGuard = () => {
  const router = inject(Router);
  const store = inject(Store);

  return store.select(selectIsAuthenticated).pipe(
    map((isAuthenticated) => {
      if (!isAuthenticated) {
        router.navigate(['/sign-in']);
        return false;
      }
      return true;
    })
  );
}; 