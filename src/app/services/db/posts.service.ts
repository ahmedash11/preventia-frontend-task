import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  constructor(private httpClient: HttpClient) {}

  public url = '/api2/posts';
  public userUrl = '/api2/users';

  public getPosts() {
    return this.httpClient.get(`${this.url}`, {}).toPromise();
  }

  public getUserPosts(id: string) {
    return this.httpClient.get(`${this.userUrl}/${id}/posts`, {}).toPromise();
  }

  public getPostComments(id: string) {
    return this.httpClient.get(`${this.url}/${id}/comments`, {}).toPromise();
  }

  public getPost(id: string) {
    return this.httpClient.get(`${this.url}/${id}`, {}).toPromise();
  }

  public deletePost(id: string) {
    return this.httpClient.delete(`${this.url}/${id}`).toPromise();
  }
}
