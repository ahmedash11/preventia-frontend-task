import { Component, OnInit } from '@angular/core';
import { AlbumService } from 'src/app/services/db/albums.service';
import { UtilsService } from 'src/app/services/utils/utils.service';

@Component({
  selector: 'app-albums',
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.scss'],
})
export class AlbumsComponent implements OnInit {
  constructor(
    private albumService: AlbumService,
    private utilsService: UtilsService
  ) {}

  public isLoading = false;
  public albums: any = [];
  public cols = [{ value: 'title', title: 'Title', visible: true }];

  ngOnInit() {
    this.fetch();
  }

  async fetch() {
    this.isLoading = true;
    try {
      let response = await this.albumService.getAlbums();
      this.albums = response;
      // this.admins = response["admins"];
    } catch (error) {
      this.utilsService.forwardErrorMessage('Failed to fetch the Album');
    }
    this.isLoading = false;
  }

  async delete(idx: string) {
    try {
      await this.albumService.deleteAlbum(idx);
      this.utilsService.handleSuccess(`Album ${idx} was successfully deleted`);
      this.fetch();
    } catch (error) {
      this.utilsService.forwardErrorMessage(`Failed to delete Album ${idx}`);
    }
  }
}
