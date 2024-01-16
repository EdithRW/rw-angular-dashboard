import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { tap } from 'rxjs';

export const AuthGuard: CanActivateFn = (route, state) => {

  const userService = inject(UserService);
  const router = inject(Router);

  console.log('pase por el guard can activate');

  return userService.validateToken()
  .pipe(
    tap(isAuthenticated => {
      if(!isAuthenticated){
        router.navigateByUrl('/auth/login');
      }
    })
  )
};
