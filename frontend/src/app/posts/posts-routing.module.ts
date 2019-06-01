import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewPostComponent } from './new-post/new-post.component';
import { PostResolver } from '../services/resolvers/post.resolver';
import { PostsListComponent } from './posts-list/posts-list.component';

const routes: Routes = [
  { path: 'new-post', component: NewPostComponent },
  { path: 'modify-post/:id', component: NewPostComponent, resolve: { post: PostResolver } },
  { path: '', pathMatch: 'full', component: PostsListComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class PostsRoutingModule {}
