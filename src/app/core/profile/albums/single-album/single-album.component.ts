import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-single-album',
  templateUrl: './single-album.component.html',
  styleUrls: ['./single-album.component.scss'],
})
export class SingleAlbumComponent implements OnInit {
  @Input()
  albums: any = [];

  constructor() {}

  ngOnInit(): void {}
}
