import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [

  {
    path: 'dashboard',
    loadComponent: () => import('./dashboard/dashboard.component'),
    canActivate: [AuthGuard],
    children: [
      {
        path: 'home',
        title: 'Home',
        loadComponent: () => import('./dashboard/views/home/home.component')
      },
      {
        path: 'settings',
        title: 'Settings',
        loadComponent: () => import('./dashboard/views/settings/settings.component')
      },
      {
        path: 'tables',
        title: 'Tables',
        loadComponent: () => import('./dashboard/views/tables/tables.component')
      },
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      }


    ]
  },
  {
    path: 'auth',
    children: [
      {
        path: 'login',
        title: 'Login',
        loadComponent: () => import('./auth/login/login.component'),
      },
      {
        path: 'register',
        title: 'Register',
        loadComponent: () => import('./auth/register/register.component'),
      },
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full'
  }


];
