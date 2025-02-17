import { HttpHeaders, HttpInterceptorFn } from '@angular/common/http';

export const httpHeadersInterceptor: HttpInterceptorFn = (req, next) => {
  const newHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  req = req.clone({
    headers: newHeaders,
  });
  return next(req);
};
