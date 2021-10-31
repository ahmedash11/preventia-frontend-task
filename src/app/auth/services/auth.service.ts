import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUser = new BehaviorSubject(
    JSON.parse(localStorage.getItem('currentUser')!)
  );
  currentUserValue = this.currentUser.asObservable();

  constructor(private httpClient: HttpClient) {}
  async register(formValue: any) {
    return this.httpClient.post(`api1/api/register`, formValue).toPromise();
  }
  async login(formValue: any) {
    return this.httpClient.post(`api1/api/login`, formValue).toPromise();
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('currentUser')!);
  }
  setCurrentUser(user: any) {
    localStorage.setItem('currentUser', JSON.stringify(user));
  }
  logout() {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('JWToken');
    this.forwardUser(null);
  }

  public forwardUser(user: any) {
    return this.currentUser.next(user);
  }
}
