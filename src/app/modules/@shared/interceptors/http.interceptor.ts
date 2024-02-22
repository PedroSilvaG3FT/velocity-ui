import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthStore } from '../../../store/auth.store';

export const HttpInterceptor: HttpInterceptorFn = (req, next) => {
  const authStore = inject(AuthStore);
  const token = authStore.requestHeaderToken();

  if (!!token) {
    const cloned = req.clone({ setHeaders: { Authorization: token } });
    return next(cloned);
  } else return next(req);
};
