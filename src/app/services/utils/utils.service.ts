import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { PHOTOS_URLS } from 'src/app/constants/photos.constants';

@Injectable({
  providedIn: 'root',
})
export class UtilsService {
  private toastObj = new BehaviorSubject({ message: '', errorFlag: -1 });
  toastObjValue = this.toastObj.asObservable();

  constructor() {}

  public getKeyValue = (key: string) => (obj: Record<string, any>) => obj[key];
  public objectToArray = (response: any) =>
    Object.keys(response).map(function (idx) {
      let res = response[idx];
      return res;
    });

  //Renders error toast
  public forwardErrorMessage(message: any) {
    this.toastObj.next({ message: message, errorFlag: 1 });
  }

  //Renders success toast
  public handleSuccess(message: string) {
    this.toastObj.next({ message: message, errorFlag: 0 });
  }

  //Returns Random image url from the photos.constants file
  public returnRandomImage() {
    return PHOTOS_URLS[Math.floor(Math.random() * PHOTOS_URLS.length)]
      .download_url;
  }
}
