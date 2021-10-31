import { Component, OnInit } from '@angular/core';
import { PostsService } from 'src/app/services/db/posts.service';
import { UtilsService } from 'src/app/services/utils/utils.service';

@Component({
  selector: 'app-profile-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
})
export class PostsComponent implements OnInit {
  public posts: any = [];
  public comments: any = [];
  public postId: any = 1;
  constructor(
    public postsService: PostsService,
    public utilsService: UtilsService
  ) {}

  ngOnInit() {
    this.fetchPosts();
    this.fetchComments();
  }
  //Fetches posts of the "logged in" user
  async fetchPosts() {
    try {
      let response = await this.postsService.getUserPosts('1');
      this.posts = response;
      this.posts = this.posts.map((post: any) => ({
        ...post,
        image: this.utilsService.returnRandomImage(),
      }));
    } catch (error) {
      this.utilsService.forwardErrorMessage('Failed to fetch the Post');
    }
  }

  //Fetches Comments of a specific post
  async fetchComments(id: any = '1') {
    this.comments = [];
    this.postId = id;
    try {
      let response = await this.postsService.getPostComments(id);
      this.comments = response;
      this.comments = this.comments.map((comment: any) => ({
        ...comment,
        avatar: this.utilsService.returnRandomImage(),
      }));
    } catch (error) {
      this.utilsService.forwardErrorMessage('Failed to fetch the Post');
    }
  }
}
