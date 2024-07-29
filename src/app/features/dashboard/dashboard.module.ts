import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { UserManagementComponent } from './components/user-management/user-management.component';
import { SettingsComponent } from './components/settings/settings.component';
import { CoreModule } from 'src/app/core/core.module';
import { UserFormDialogComponent } from './components/user-form-dialog/user-form-dialog.component';
import { CustomerListComponent } from './components/customer-list/customer-list.component';
import { CustomerFormComponent } from './components/customer-form/customer-form.component';
import { CustomerDetailsComponent } from './components/customer-details/customer-details.component';

@NgModule({
  declarations: [
    UserManagementComponent,
    SettingsComponent,
    UserFormDialogComponent,
    CustomerListComponent,
    CustomerFormComponent,
    CustomerDetailsComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    CoreModule,
  ],
})
export class DashboardModule {}
