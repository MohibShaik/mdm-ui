import { Component, OnInit } from '@angular/core';

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

  constructor() {}

  ngOnInit(): void {
    this.navLinks = [
      {
        id: 1,
        displayName: 'User Management',
        route: '/dashboard/users',
        iconName: 'user-inactive',
        activeIcon: 'user-active',
        disabled: false,
      },
      {
        id: 2,
        displayName: 'Settings',
        iconName: 'settings-inactive',
        route: '/dashboard/settings',
        activeIcon: 'settings-active',
        disabled: true,
      },
    ];
  }
}
