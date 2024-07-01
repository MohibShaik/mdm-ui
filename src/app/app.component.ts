import { Component } from '@angular/core';
import { RegisterIconService } from './core/layout/services/register-icon.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'mdm-ui';
  constructor(private iconService: RegisterIconService) {
    this.iconService.initiateIconRegistration();
  }
}
