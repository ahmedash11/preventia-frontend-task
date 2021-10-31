import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UtilsService } from 'src/app/services/utils/utils.service';

@Component({
  selector: 'app-single-post',
  templateUrl: './single-post.component.html',
  styleUrls: ['./single-post.component.scss'],
})
export class SinglePostComponent implements OnInit {
  @Input()
  post: any = {};

  @Output() viewPostComments: EventEmitter<any> = new EventEmitter();
  constructor(public utilsService: UtilsService) {}

  ngOnInit() {}

  async viewComments(id: any) {
    this.viewPostComments.emit(id);
  }
}
