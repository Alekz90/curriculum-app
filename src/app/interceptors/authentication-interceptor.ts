import type { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthenticationService } from '@app/services/authentication.service';

export const AuthenticationInterceptor: HttpInterceptorFn = (req, next) => {

  // Inject the current `AuthService` and use it to get an authentication token:
  const authToken = `Bearer ${inject(AuthenticationService).token() ?? ''}`;
  
  // Clone the request to add the authentication header.
  const newReq = req.clone({
    headers: req.headers.append('Authorization', authToken),
  });
  
  return next(newReq);
};
