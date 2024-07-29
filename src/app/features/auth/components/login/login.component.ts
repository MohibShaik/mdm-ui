import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../state/auth.service';
import { User } from '../../models/user.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  @Output() onSignIn = new EventEmitter();

  public loginForm!: FormGroup;
  public passwordType: string = 'password';
  public passwordIcon: string = 'eye_off';
  constructor(
    private fb: FormBuilder,
    private router: Router,
    public authService: AuthService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.initializeLoginForm();
  }

  get f() {
    return this.loginForm.controls;
  }

  public initializeLoginForm() {
    this.loginForm = this.fb.group({
      emailAddress: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  public hideShowPassword() {
    this.passwordType = this.passwordType === 'text' ? 'password' : 'text';
    this.passwordIcon = this.passwordIcon === 'eye_off' ? 'eye_on' : 'eye_off';
  }

  public checkFormError = (controlName: string, errorName: string) => {
    return this.loginForm?.controls[controlName].hasError(errorName);
  };

  public login() {
    if (this.loginForm.invalid) {
      return;
    } else {
      this.authService.login(this.loginForm.value).subscribe(
        (response: any) => {
          sessionStorage.setItem('accessToken', response?.data.accessToken);
          sessionStorage.setItem('user_name', response?.data.username);
          sessionStorage.setItem('user_id', response?.data._id);
          // sessionStorage.setItem('user_type', response?.data.role);
          this.router.navigateByUrl('/home');
          // this.onSignIn.emit(true);
        },
        (error) => {
          // this.onSignIn.emit(false);
          console.log(error);
        }
      );
    }
  }
}
