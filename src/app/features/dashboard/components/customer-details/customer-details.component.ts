import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Customer } from '../../models/customer';
import { CustomersService } from '../../state/customers.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.scss'],
})
export class CustomerDetailsComponent implements OnInit {
  public customerInfo: any;
  public currentUserId = sessionStorage.getItem('id');
  public hasApprovalAccess = false;
  constructor(
    public dialogRef: MatDialogRef<CustomerDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) data: Customer,
    private service: CustomersService,
    private toastr: ToastrService
  ) {
    this.customerInfo = data;
    console.log(this.customerInfo);
  }

  ngOnInit() {
    this.checkApprovalEligibility();
  }

  public checkApprovalEligibility() {
    const index = this.customerInfo.approvers.findIndex(
      (approver: any) =>
        approver?.approverId._id === this.currentUserId && !approver?.isApproved
    );
    this.hasApprovalAccess = index === -1 ? false : true;
    console.log(this.hasApprovalAccess);
  }

  public approve() {
    const data = this.customerInfo.approvers
      .filter(
        (approver: any) => approver?.approverId._id === this.currentUserId
      )
      .map((x: any) => (x.isApproved = true));

    this.service
      .updateCustomer(this.customerInfo, this.customerInfo?._id)
      .subscribe(
        (response) => {
          this.toastr.success(response?.message);
          this.dialogRef.close(true);
        },
        (error) => {
          // this.toastr.error('Something went wrong , please try again later');
        }
      );
  }
}
