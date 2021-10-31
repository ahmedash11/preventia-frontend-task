import { Injectable, Inject } from '@angular/core';
import {
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpResponse,
  HttpSentEvent,
  HttpHeaderResponse,
  HttpProgressEvent,
  HttpUserEvent,
  HttpErrorResponse,
  HttpClient,
} from '@angular/common/http';

import { Observable, of, from, throwError } from 'rxjs';
import { map, catchError, mergeMap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

export const InterceptorSkipHeader = 'X-Skip-Interceptor';
@Injectable()
export class ApiInterceptor implements HttpInterceptor {
  constructor(private router: Router, private httpClient: HttpClient) {}

  private handleAuthError(
    err: HttpErrorResponse,
    req: HttpRequest<any>,
    next: HttpHandler
  ): any {
    localStorage.removeItem('JWToken');
    window.location.href = '/';
    return of(err.message);
  }

  addUrl(req: HttpRequest<any>): HttpRequest<any> {
    // const apiUrl = environment.apiUrl;
    const api1Url = environment.api1Url;
    const api2Url = environment.api2Url;
    //Checks for the api prefex reference and then append needed url to perform the request
    if (req.url.includes('api1')) {
      return req.clone({
        url: `${api1Url}${req.url.replace('api1', '')}`,
      });
    } else if (req.url.includes('api2')) {
      return req.clone({
        url: `${api2Url}${req.url.replace('/api2', '')}`,
      });
    }
    return req.clone({
      url: `${req.url}`,
    });
  }

  addToken(req: HttpRequest<any>): HttpRequest<any> {
    const apiToken = localStorage.getItem('JWToken');
    if (apiToken)
      return req.clone({
        headers: req.headers.set('Authorization', apiToken),
      });
    return req.clone();
  }
  // TODO: refresh token
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<
    | HttpSentEvent
    | HttpHeaderResponse
    | HttpProgressEvent
    | HttpResponse<any>
    | HttpUserEvent<any>
  > {
    const apiReq = this.addUrl(req);

    if (apiReq.headers.has(InterceptorSkipHeader)) {
      const headers = apiReq.headers.delete(InterceptorSkipHeader);
      return next.handle(apiReq.clone({ headers }));
    }

    // Clone the request to add the new header.
    const authReq = this.addToken(apiReq);
    // send the newly created request
    return next.handle(authReq).pipe(
      map((data) => data),
      catchError((error, caught) => {
        if (error.status === 401) {
          const errTHROW = this.handleAuthError(error, req, next);
          return errTHROW;
        } else {
          return throwError(error);
        }
      }) as any
    );
  }
}
