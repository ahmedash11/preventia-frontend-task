import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { AlbumsComponent } from './albums/albums.component';
import { PostsComponent } from './posts/posts.component';
import { SinglePostComponent } from './posts/single-post/single-post.component';
import { CommentsComponent } from './posts/comments/comments.component';
import { SingleAlbumComponent } from './albums/single-album/single-album.component';
import { PhotosComponent } from './photos/photos.component';
import { ProfileComponent } from './profile.component';
import { CommentModalComponent } from './posts/comment-modal/comment-modal.component';


@NgModule({
  declarations: [
    AlbumsComponent,
    PostsComponent,
    SinglePostComponent,
    CommentsComponent,
    SingleAlbumComponent,
    PhotosComponent,
    ProfileComponent,
    CommentModalComponent
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule
  ]
})
export class ProfileModule { }
