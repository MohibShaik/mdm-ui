import { Component, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as moment from 'moment-timezone';
import { CustomersService } from 'src/app/features/dashboard/state/customers.service';

@Component({
  selector: 'app-datelogdialog',
  templateUrl: './datelogdialog.component.html',
  styleUrls: ['./datelogdialog.component.scss'],
})
export class DatelogdialogComponent {
  public startDate = new FormControl(new Date(), [Validators.required]);
  empInfo: any;
  constructor(
    public dialogRef: MatDialogRef<DatelogdialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public service: CustomersService
  ) {
    this.empInfo = data;
    console.log(this.empInfo);
  }

  close(): void {
    this.dialogRef.close(false);
  }

  public updateDatesLog() {
    console.log(this.startDate?.value?.toISOString());

    const empInfoObj = {
      empId: this.empInfo?._id,
      dates: [
        {
          startDate: this.startDate?.value?.toISOString(),
          endDate: '',
        },
      ],
    };
    this.service.updateEmpAvailability(empInfoObj).subscribe(
      (response) => {
        // console.log(response);
        if (response) {
          this.dialogRef.close(true);
        }
      },
      (error) => {
        this.dialogRef.close(false);
      }
    );
  }
}
