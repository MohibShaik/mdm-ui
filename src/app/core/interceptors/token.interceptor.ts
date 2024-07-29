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
  clonedRequest!: HttpRequest<any>;
  constructor(private toastr: ToastrService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const accessToken = sessionStorage.getItem('accessToken')!;
    // Clone the request to add the new header

    console.log(req, 'request');

    if (req.url.includes('https://api.apilayer.com/skills?q=')) {
      this.clonedRequest = req.clone({
        headers: new HttpHeaders({
          apikey: 'ZPbwnrM02mr4wUfqgPWcHRXxxBzesuDl',
        }),
      });
    } else {
      this.clonedRequest = req.clone({
        headers: new HttpHeaders({
          'x-access-token': accessToken ? accessToken : '',
        }),
      });
    }

    // Handle the request
    return next.handle(this.clonedRequest).pipe(
      catchError((error: HttpErrorResponse) => {
        // Handle the error
        console.error('Error occurred:', error);
        this.toastr.error(error.error.message);
        return throwError(() => new Error(error.error.message));
      })
    );
  }
}
