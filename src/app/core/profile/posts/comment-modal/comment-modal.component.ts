import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-comment-modal',
  templateUrl: './comment-modal.component.html',
  styleUrls: ['./comment-modal.component.scss'],
})
export class CommentModalComponent implements OnInit {
  @Input()
  comments: any = [];
  @Input()
  postId: any = [];
  constructor() {}

  ngOnInit(): void {}
}
