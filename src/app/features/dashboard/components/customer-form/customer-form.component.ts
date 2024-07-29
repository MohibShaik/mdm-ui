import { Component, ElementRef, Inject, ViewChild } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormArray,
  FormControl,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CustomersService } from '../../state/customers.service';
import { UserService } from '../../state/user.service';
import { ConfigService } from 'src/app/standlone/state/config.service';
import { authQuery } from 'src/app/features/auth/state/auth.query';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import {
  debounceTime,
  distinctUntilChanged,
  Observable
} from 'rxjs';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

@Component({
  selector: 'app-customer-form',
  templateUrl: './customer-form.component.html',
  styleUrls: ['./customer-form.component.scss'],
})
export class CustomerFormComponent {
  newUserForm!: FormGroup;
  public permissionsList = [
    {
      viewValue: 'Silver',
      value: 'silver',
    },
    {
      viewValue: 'Gold',
      value: 'gold',
    },
    {
      viewValue: 'Platinum',
      value: 'platinum',
    },
  ];
  usersList: any;
  visaOptions: any;
  options!: Observable<any[]>;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<CustomerFormComponent>,
    @Inject(MAT_DIALOG_DATA) data: any,
    private userService: UserService,
    private custService: CustomersService,
    private configService: ConfigService,
    private query: authQuery
  ) {
    this.newUserForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      role: ['employee'],
      isActive: [true],
      vendorId: [this.query.currentUserInfo?._id],
      skills: ['', [Validators.required]],
      experience: [, [Validators.required]],
      visaStatus: ['', [Validators.required]],
      designation: ['', [Validators.required]],
      address: ['', [Validators.required]],
      city: ['', [Validators.required]],
      state: ['', [Validators.required]],
    });

    this.newUserForm.controls['skills'].valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged()
      )
      .subscribe((value) => {
        if (value.length >= 3) {
          this.options = this.custService.searchOptions(value);
        }
      });
  }

  ngOnInit(): void {
    this.getVisaConfig();
  }

  createApprover(): FormGroup {
    return this.fb.group({
      approverId: ['', Validators.required],
      isApproved: [false],
    });
  }

  get f(): any {
    return this.newUserForm.controls;
  }

  public checkFormError = (controlName: string, errorName: string) => {
    return this.newUserForm?.controls[controlName].hasError(errorName);
  };

  onSubmit(): void {
    if (this.newUserForm.valid) {
      this.custService
        .createNewCust(this.newUserForm.value)
        .subscribe((response) => {
          this.dialogRef.close(true);
        });
    } else {
      console.error('Form is invalid');
    }
  }

  public close() {
    this.dialogRef.close(false);
  }

  private getVisaConfig() {
    this.configService.getVisaOptions().subscribe((data: any) => {
      this.visaOptions = data;
    });
  }

  public filterUsersList(selectedValue: string) {
    // this.selectedItem = selectedValue;
    this.usersList = this.usersList.filter(
      (item: any) => item?._id !== selectedValue
    );
  }

  private getReviewersCount(membershiptType: string): number {
    switch (membershiptType) {
      case 'silver':
        return 1;

      case 'gold':
        return 2;

      case 'platinum':
        return 5;
      default:
        return 1;
    }
  }
}
