import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import {
  HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest
} from '@angular/common/http';
import { Injectable } from '@angular/core';

import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private readonly authService: AuthService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    if (request.headers.get('Authorization') === 'No auth') {
      return next.handle(request);
    }
    return next.handle(
      request.clone({
        setHeaders: { Authorization: `Bearer ${this.authService.getToken()}` },
      })
    ).pipe(catchError(error => {
      if (error instanceof HttpErrorResponse && error.status === 401) {
        this.authService.unauthorize();
      }
      return throwError(error);
    }));
  }
}
