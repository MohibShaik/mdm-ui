import { Injectable } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root',
})
export class RegisterIconService {
  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer
  ) {}

  public initiateIconRegistration() {
    this.matIconRegistry
      .addSvgIcon(
        `user-inactive`,
        this.domSanitizer.bypassSecurityTrustResourceUrl(
          '../../../../assets/svg-icons/users-inactive.svg'
        )
      )
      .addSvgIcon(
        `user-active`,
        this.domSanitizer.bypassSecurityTrustResourceUrl(
          '../../../../assets/svg-icons/users-active.svg'
        )
      ).addSvgIcon(
        `settings-inactive`,
        this.domSanitizer.bypassSecurityTrustResourceUrl(
          '../../../../assets/svg-icons/settings-inactive.svg'
        )
      ).addSvgIcon(
        `settings-active`,
        this.domSanitizer.bypassSecurityTrustResourceUrl(
          '../../../../assets/svg-icons/settings-active.svg'
        )
      ).addSvgIcon(
        `eye_off`,
        this.domSanitizer.bypassSecurityTrustResourceUrl(
          '../../../../assets/svg-icons/eye-off.svg'
        )
      ).addSvgIcon(
        `eye_on`,
        this.domSanitizer.bypassSecurityTrustResourceUrl(
          '../../../../assets/svg-icons/eye-on.svg'
        )
      );
  }
}
