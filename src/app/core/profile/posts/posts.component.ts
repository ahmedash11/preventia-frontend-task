import { Component, OnInit } from '@angular/core';
import { PostsService } from 'src/app/services/db/posts.service';
import { UtilsService } from 'src/app/services/utils/utils.service';
import { USERS_IDS } from 'src/app/constants/users.constants';

@Component({
  selector: 'app-profile-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
})
export class PostsComponent implements OnInit {
  public posts: any = [];
  public comments: any = [];
  public USERS_IDS: any = USERS_IDS;
  public postId: any = 1;
  public userId: any = '1';
  constructor(
    public postsService: PostsService,
    public utilsService: UtilsService
  ) {}

  ngOnInit() {
    let user = JSON.parse(localStorage.getItem('currentUser') || '');
    this.userId = this.USERS_IDS[user.email];
    this.fetchPosts();
    this.fetchComments();
  }
  //Fetches posts of the "logged in" user
  async fetchPosts() {
    try {
      let response = await this.postsService.getUserPosts(this.userId);
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
