import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VendorRoutingModule } from './vendor-routing.module';
import { AuthComponent } from './components/auth/auth.component';
import { CoreModule } from 'src/app/core/core.module';
import { AuthModule } from '../auth/auth.module';

@NgModule({
  declarations: [AuthComponent],
  imports: [CommonModule, VendorRoutingModule, CoreModule, AuthModule],
})
export class VendorModule {}
