import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { ContentRoutingModule } from './content-routing.module';
import { UsersComponent } from './users/users.component';
import { PostsComponent } from './posts/posts.component';
import { AlbumsComponent } from './albums/albums.component';
import { UserFormComponent } from './users/user-form/user-form.component';

@NgModule({
  declarations: [UsersComponent, PostsComponent, AlbumsComponent, UserFormComponent],
  imports: [CommonModule, ContentRoutingModule, SharedModule],
})
export class ContentModule {}
