// const accessToken = JSON.parse(localStorage.getItem('accessToken')!);

import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private toastr: ToastrService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const accessToken = sessionStorage.getItem('accessToken')!;
    // Clone the request to add the new header
    const clonedRequest = req.clone({
      headers: new HttpHeaders({
        'x-access-token': accessToken,
      }),
    });

    // Handle the request
    return next.handle(clonedRequest).pipe(
      catchError((error: HttpErrorResponse) => {
        // Handle the error
        console.error('Error occurred:', error);
        this.toastr.error(error.error.message);
        return throwError(() => new Error(error.error.message));
      })
    );
  }
}
