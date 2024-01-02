
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SideMenuComponent } from './components/side-menu/side-menu.component';
import { routes } from '../app.routes';
import { AdminNavbarComponent } from './components/navbars/admin-navbar/admin-navbar.component';
import { HeaderStatsComponent } from './components/headers/header-stats/header-stats.component';
import { FooterAdminComponent } from './components/footers/footer-admin/footer-admin.component';

@Component({
  standalone: true,
  imports: [RouterModule, SideMenuComponent, AdminNavbarComponent, HeaderStatsComponent, FooterAdminComponent],
  templateUrl: './dashboard.component.html',

})
export default class DashboardComponent {


  public menuItems = routes
  .map(route => route.children ?? [])
  .flat()
  .filter(route => route && route.path)
  .filter(route => !route.path?.includes(':'))

}
