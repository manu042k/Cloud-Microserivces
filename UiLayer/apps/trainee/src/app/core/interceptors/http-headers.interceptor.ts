import { HttpHeaders, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectToken } from '@ui-layer/auth';
import { mergeMap, take } from 'rxjs/operators';

export const httpHeadersInterceptor: HttpInterceptorFn = (req, next) => {
  const store = inject(Store);

  return store.select(selectToken).pipe(
    take(1),
    mergeMap((token) => {
      console.log('token', token);
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      });

      return next(req.clone({ headers }));
    })
  );
};
