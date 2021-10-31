import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { USERS_IDS } from '../constants/users.constants';

@Injectable({
  providedIn: 'root',
})
export class UserGuard implements CanActivate {
  USER_IDS: any = USERS_IDS;
  constructor(private router: Router) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    //Returns true when there is a loggedin user and that user is a normal user
    if (
      localStorage.getItem('JWToken') &&
      localStorage.getItem('currentUser')
    ) {
      let user = JSON.parse(localStorage.getItem('currentUser') || '');
      if (this.USER_IDS[user.email] != 1) {
        return true;
      } else {
        this.router.navigate([`/dashboard`]);
        return false;
      }
    }
    this.router.navigate([`/`]);
    return false;
  }
}
