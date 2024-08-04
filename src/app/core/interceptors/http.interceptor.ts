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
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable()
export class ErrorHttpInterceptor implements HttpInterceptor {
  constructor(private spinner: NgxSpinnerService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // this.spinner.show();
    return next
      .handle(
        request.clone({
          headers: request.headers.append('Cache-Control', 'no-cache'),
        })
      )
      .pipe(
        retry(0),
        // finalize(() => {
        //   setTimeout(() => {
        //     this.spinner.hide();
        //   }, 2000);
        // }),
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
