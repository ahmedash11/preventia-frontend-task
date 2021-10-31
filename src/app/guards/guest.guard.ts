import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { USERS_IDS } from '../constants/users.constants';

@Injectable({
  providedIn: 'root',
})
export class GuestGuard implements CanActivate {
  USER_IDS: any = USERS_IDS;
  constructor(private router: Router) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    //Returns true when there is no logged in user found
    if (
      localStorage.getItem('JWToken') &&
      localStorage.getItem('currentUser')
    ) {
      let user = JSON.parse(localStorage.getItem('currentUser') || '');
      if (this.USER_IDS[user.email] == 1) {
        this.router.navigate([`/dashboard`]);
      } else {
        this.router.navigate([`/profile`]);
      }
      return false;
    }
    return true;
  }
}
