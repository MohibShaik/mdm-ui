import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpRequest,
  HttpHandler,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
// import { ToastrService } from 'ngx-toastr';
import { retry, catchError, finalize } from 'rxjs/operators';

@Injectable()
export class ErrorHttpInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next
      .handle(
        request.clone({
          headers: request.headers.append('Cache-Control', 'no-cache'),
        })
      )
      .pipe(
        retry(0),
        //finalize(() => {}),
        catchError((error: HttpErrorResponse) => {
          if (
            error.status === 400 &&
            !Array.isArray(error.error) &&
            !(typeof error.error === 'object')
          ) {
            // this.toastr.error(error.error || error.message);
          } else if (error.status === 404) {
            // this.toastr.error(error.error);
          } else if (error.status === 500) {
            // this.toastr.error(error.error.error);
          }
          return throwError(error);
        })
      );
  }
}
