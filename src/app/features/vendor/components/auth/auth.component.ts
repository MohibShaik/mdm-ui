import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent {
  constructor(private router: Router) {}
  public onSignIn(event: any) {
    console.log(event);

    if (event) {
      this.router.navigateByUrl('/home');
    }
  }
}
