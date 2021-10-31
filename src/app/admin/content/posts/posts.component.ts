import { Component, OnInit } from '@angular/core';
import { PostsService } from 'src/app/services/db/posts.service';
import { UtilsService } from 'src/app/services/utils/utils.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
})
export class PostsComponent implements OnInit {
  constructor(
    private postsService: PostsService,
    private utilsService: UtilsService
  ) {}

  public isLoading = false;
  public posts: any = [];
  public cols = [
    { value: 'title', title: 'Title', visible: true },
    { value: 'body', title: 'Body', visible: true },
  ];

  ngOnInit() {
    this.fetch();
  }

  async fetch() {
    this.isLoading = true;
    try {
      let response = await this.postsService.getPosts();
      this.posts = response;
      // this.admins = response["admins"];
    } catch (error) {
      this.utilsService.forwardErrorMessage('Failed to fetch the Post');
    }
    this.isLoading = false;
  }

  async delete(idx: string) {
    try {
      await this.postsService.deletePost(idx);
      this.utilsService.handleSuccess(`Post ${idx} was successfully deleted`);
      this.fetch();
    } catch (error) {
      this.utilsService.forwardErrorMessage(`Failed to delete Post ${idx}`);
    }
  }
}
