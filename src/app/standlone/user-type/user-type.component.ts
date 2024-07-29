import { Component, OnInit } from '@angular/core';
import { ConfigService } from '../state/config.service';
import { IUserType } from '../models/user-type';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-type',
  templateUrl: './user-type.component.html',
  styleUrls: ['./user-type.component.scss'],
})
export class UserTypeComponent implements OnInit {
  public userTypes!: IUserType[];
  constructor(private configService: ConfigService, private router: Router) {}

  ngOnInit(): void {
    this.getUserTypes();
  }

  private getUserTypes() {
    this.configService.getConfig().subscribe((response: IUserType[]) => {
      this.userTypes = response;
    });
  }

  public onUserTypeSelection(value: string) {
    sessionStorage.setItem('user_type', value);
    this.router.navigateByUrl('/' + value);
  }
}
