import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    // Ignore requests outside API domain
    if (!request.url.startsWith(environment.apiRoot) && !request.url.startsWith(environment.hubRoot)) {
      return next.handle(request);
    }

    // Attach cookies to requests
    request = request.clone({
      withCredentials: true,
    });

    return next.handle(request);
  }
}
