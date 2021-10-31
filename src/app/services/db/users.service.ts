import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private httpClient: HttpClient) {}

  public url = 'api1/api/users';
  public getUsers() {
    return this.httpClient.get(`${this.url}`, {}).toPromise();
  }

  public getUser(id: string) {
    return this.httpClient.get(`${this.url}/${id}`, {}).toPromise();
  }

  public addUser(formValue: any) {
    return this.httpClient.post(`${this.url}`, { user: formValue }).toPromise();
  }

  public updateUser(id: string, formValue: any) {
    return this.httpClient
      .patch(`${this.url}/${id}`, { user: formValue })
      .toPromise();
  }

  public deleteUser(id: string) {
    return this.httpClient.delete(`${this.url}/${id}`).toPromise();
  }
}
