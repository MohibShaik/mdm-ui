import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../state/user.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/features/auth/models/user.model';

@Component({
  selector: 'app-user-form-dialog',
  templateUrl: './user-form-dialog.component.html',
  styleUrls: ['./user-form-dialog.component.scss'],
})
export class UserFormDialogComponent implements OnInit {
  userInfo: any;
  get f() {
    return this.newUserForm.controls;
  }
  public newUserForm!: FormGroup;
  public permissionsList = [
    {
      viewValue: 'Admin',
      value: 'admin',
    },
    {
      viewValue: 'Checker',
      value: 'checker',
    },
    {
      viewValue: 'Creator',
      value: 'creator',
    },
    {
      viewValue: 'User',
      value: 'user',
    },
  ];
  constructor(
    public fb: FormBuilder,
    private service: UserService,
    private toastr: ToastrService,
    public dialogRef: MatDialogRef<UserFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data: User
  ) {
    this.userInfo = data;
  }

  ngOnInit(): void {
    this.initializeForm();

    if (this.userInfo) {
      this.newUserForm.patchValue({
        username: this.userInfo.username,
        email: this.userInfo.email,
        permissions: this.userInfo.permissions,
        isActive: this.userInfo.isActive,
      });
    }
  }

  private initializeForm() {
    this.newUserForm = this.fb.group({
      username: ['', [Validators.required]],
      email: ['', [Validators.required]],
      permissions: ['', [Validators.required]],
      isActive: [false],
    });
  }

  public onSubmit() {
    if (this.userInfo) {
      this.service.updateUser(this.newUserForm.value , this.userInfo?._id).subscribe(
        (response) => {
          this.toastr.success(response?.message);
          this.dialogRef.close(true);
        },
        (error) => {
          // this.toastr.error('Something went wrong , please try again later');
        }
      );
    } else {
      this.service.createNewUser(this.newUserForm.value).subscribe(
        (response) => {
          this.toastr.success('User saved successfully');
          this.dialogRef.close(true);
        },
        (error) => {
          // this.toastr.error('Something went wrong , please try again later');
        }
      );
    }
  }

  public close() {
    this.dialogRef.close(false);
  }
}
