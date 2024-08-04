import { NgModule } from '@angular/core';
import {
  CommonModule,
  HashLocationStrategy,
  LocationStrategy,
} from '@angular/common';
import { MaterialModule } from './modules/material/material.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from '../features/auth/components/login/login.component';
import { FooterComponent } from './layout/components/footer/footer.component';
import { LayoutComponent } from './layout/components/layout/layout.component';
import { SideNavComponent } from './layout/components/side-nav/side-nav.component';
import { RouterModule } from '@angular/router';
import { ToastrModule } from 'ngx-toastr';
import { AuthInterceptor } from './interceptors/token.interceptor';
import { ErrorHttpInterceptor } from './interceptors/http.interceptor';
import { GreetingComponent } from './layout/components/greeting/greeting.component';
import { NgxSpinnerModule } from 'ngx-spinner';

@NgModule({
  declarations: [
    SideNavComponent,
    LayoutComponent,
    FooterComponent,
    GreetingComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
    }),
    NgxSpinnerModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    // { provide: HTTP_INTERCEPTORS, useClass: ErrorHttpInterceptor, multi: true },
    // { provide: LocationStrategy, useClass: HashLocationStrategy },
  ],
  exports: [
    MaterialModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    SideNavComponent,
    LayoutComponent,
    FooterComponent,
    RouterModule,
    NgxSpinnerModule,
  ],
})
export class CoreModule {}
