import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AlbumService {
  constructor(private httpClient: HttpClient) {}

  public url = '/api2/albums';
  public getAlbums() {
    return this.httpClient.get(`${this.url}`, {}).toPromise();
  }

  public getAlbum(id: string) {
    return this.httpClient.get(`${this.url}/${id}`, {}).toPromise();
  }

  public deleteAlbum(id: string) {
    return this.httpClient.delete(`${this.url}/${id}`).toPromise();
  }
}
