import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PhotosService } from 'src/app/services/db/photos.service';
import { UtilsService } from 'src/app/services/utils/utils.service';
@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.scss'],
})
export class PhotosComponent implements OnInit {
  public albumId: any = '1';
  public photos: any = [];
  public sliceIdx: number = 8;
  constructor(
    private route: ActivatedRoute,
    public photosService: PhotosService,
    public utilsService: UtilsService
  ) {}

  ngOnInit(): void {
    //Get Album ID from the params
    this.route.params.subscribe((params) => {
      if (params['id']) {
        this.albumId = params['id'];
      }
      this.fetchPhotos(this.albumId);
    });
  }

  //Returning album photos
  async fetchPhotos(id: any = '1') {
    try {
      let response = await this.photosService.getAlbumPhotos(id);
      this.photos = response;
      //Injecting random image to the response
      this.photos = this.photos.map((photo: any) => ({
        ...photo,
        image: this.utilsService.returnRandomImage(),
      }));
    } catch (error) {
      this.utilsService.forwardErrorMessage('Failed to fetch the Album Photos');
    }
  }

  viewMorePhotos() {
    this.sliceIdx += 4;
  }
}
