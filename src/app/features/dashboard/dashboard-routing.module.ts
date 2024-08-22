import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from 'src/app/core/layout/components/layout/layout.component';
import { UserManagementComponent } from './components/user-management/user-management.component';
import { SettingsComponent } from './components/settings/settings.component';
import { CustomerListComponent } from './components/customer-list/customer-list.component';
import { CustomerFormComponent } from './components/customer-form/customer-form.component';
import { EmpDetailsComponent } from './components/emp-details/emp-details.component';
import { JobsComponent } from './components/jobs/jobs.component';
import { JobFormComponent } from './components/job-form/job-form.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
      {
        path: 'dashboard',
        component: UserManagementComponent,
      },
      {
        path: 'employees',
        component: CustomerListComponent,
      },
      {
        path: 'employee/new',
        component: CustomerFormComponent,
      },
      {
        path: 'employees/:empId',
        component: EmpDetailsComponent,
      },
      {
        path: 'settings',
        component: SettingsComponent,
      },
      {
        path: 'jobs',
        component: JobsComponent,
      },

      {
        path: 'job/new',
        component: JobFormComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
