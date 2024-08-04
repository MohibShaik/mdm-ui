import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { authQuery } from 'src/app/features/auth/state/auth.query';
import { AuthService } from 'src/app/features/auth/state/auth.service';
import { ConfigService } from 'src/app/standlone/state/config.service';
import { resetStores } from "@datorama/akita";

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss'],
})
export class SideNavComponent implements OnInit {
  public isExpanded = true;
  public navLinks!: {
    id: number;
    displayName: string;
    route: string;
    iconName: string;
    activeIcon: string;
    disabled: boolean;
  }[];
  public currentUserInfo: any;
  public sideNavList: any;

  constructor(
    private configService: ConfigService,
    private authService: AuthService,
    private router: Router,
    public query: authQuery
  ) {}

  ngOnInit(): void {
    this.getSideNavLinks();
  }

  private getSideNavLinks() {
    this.configService.getSideNavLinks().subscribe((response) => {
      this.sideNavList = response;
      this.navLinks = this.sideNavList[this.query.currentUserInfo?.role];
    });
  }

  public logout() {
    sessionStorage.clear();
    resetStores(); 
    this.router.navigateByUrl('/');
  }
}
