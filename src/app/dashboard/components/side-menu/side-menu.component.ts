import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

import { routes } from '../../../app.routes';
import { NotificationDropdownComponent } from '../dropdowns/notification-dropdown/notification-dropdown.component';
import { UserDropdownComponent } from '../dropdowns/user-dropdown/user-dropdown.component';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-side-menu',
  standalone: true,
  imports: [CommonModule,RouterModule, NotificationDropdownComponent, UserDropdownComponent],
  templateUrl: './side-menu.component.html',
})
export class SideMenuComponent {

  public menuItems = routes
  .map(route => route.children ?? [])
  .flat()
  .filter(route => route && route.path)
  .filter(route => !route.path?.includes(':'))
  .filter(route => route.title != 'Login' && route.title != 'Register')

  collapseShow = "hidden";

  ngOnInit() {}
  toggleCollapseShow(classes: string) {
    this.collapseShow = classes;
  }

}
