import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from './components/table/table.component';
import { HttpClientModule } from '@angular/common/http';
import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';
import { CoreModule } from '../core/core.module';

@NgModule({
  declarations: [TableComponent, ConfirmationDialogComponent],
  imports: [CommonModule, HttpClientModule, CoreModule],
  exports: [TableComponent],
})
export class SharedModule {}
