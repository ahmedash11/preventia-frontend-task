import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlbumsComponent } from './albums/albums.component';
import { ContentComponent } from './content.component';
import { PostsComponent } from './posts/posts.component';
import { UserFormComponent } from './users/user-form/user-form.component';
import { UsersComponent } from './users/users.component';

const routes: Routes = [
  {
    path: '',
    component: ContentComponent,
    children: [
      {
        path: '',
        redirectTo: 'users',
        pathMatch: 'full',
      },
      {
        path: 'users',
        component: UsersComponent,
      },
      {
        path: 'users/add',
        component: UserFormComponent,
      },
      {
        path: 'users/:id',
        component: UserFormComponent,
      },
      {
        path: 'posts',
        component: PostsComponent,
      },
      {
        path: 'albums',
        component: AlbumsComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContentRoutingModule {}
