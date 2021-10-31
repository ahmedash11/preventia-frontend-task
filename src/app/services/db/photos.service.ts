import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class PhotosService {
  constructor(private httpClient: HttpClient) {}

  public url = '/api2/photos';
  public getPhotos() {
    return this.httpClient.get(`${this.url}`, {}).toPromise();
  }

  public getAlbumPhotos(id: string) {
    return this.httpClient
      .get(`${this.url}/`, {
        params: {
          albumId: id,
        },
      })
      .toPromise();
  }
}
