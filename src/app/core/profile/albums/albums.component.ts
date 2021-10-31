import { Component, OnInit } from '@angular/core';
import { AlbumService } from 'src/app/services/db/albums.service';
import { UtilsService } from 'src/app/services/utils/utils.service';

@Component({
  selector: 'app-profile-albums',
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.scss'],
})
export class AlbumsComponent implements OnInit {
  public albums: any = [];
  public chunkAlbums: any = [];
  public activeAlbums: any = [];
  public sliceIdx: number = 3;
  constructor(
    public albumService: AlbumService,
    public utilsService: UtilsService
  ) {}

  ngOnInit() {
    this.fetchAlbums();
  }
  async fetchAlbums() {
    try {
      let response = await this.albumService.getAlbums();
      this.albums = response;
      for (var i = 0; i < this.albums.length; i += 3) {
        this.chunkAlbums.push(this.albums.slice(i, i + 3));
      }
      this.activeAlbums = this.chunkAlbums.slice(0, this.sliceIdx);
    } catch (error) {
      this.utilsService.forwardErrorMessage('Failed to fetch Albums');
    }
  }

  viewMoreAlbums() {
    this.sliceIdx += 3;
    this.activeAlbums = this.chunkAlbums.slice(0, this.sliceIdx);
  }
}
