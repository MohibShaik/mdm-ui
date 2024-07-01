import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { UserManagementComponent } from './components/user-management/user-management.component';
import { SettingsComponent } from './components/settings/settings.component';
import { CoreModule } from 'src/app/core/core.module';
import { UserFormDialogComponent } from './components/user-form-dialog/user-form-dialog.component';

@NgModule({
  declarations: [UserManagementComponent, SettingsComponent, UserFormDialogComponent],
  imports: [CommonModule, DashboardRoutingModule, CoreModule],
})
export class DashboardModule {}
