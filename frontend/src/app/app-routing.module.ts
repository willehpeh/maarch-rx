import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PostsListComponent } from './posts-list/posts-list.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { MessagesListComponent } from './messages-list/messages-list.component';
import { NewPostComponent } from './new-post/new-post.component';
import { PostResolver } from './services/resolvers/post.resolver';
import { AuthGuard } from './services/guards/auth.guard';

const routes: Routes = [
  { path: 'auth', children: [
      { path: 'login', component: LoginComponent },
      { path: 'signup', component: SignupComponent }
    ]},
  { path: 'posts', canActivate: [AuthGuard], children: [
      { path: 'new-post', component: NewPostComponent },
      { path: 'modify-post/:id', component: NewPostComponent, resolve: { post: PostResolver } },
      { path: '', pathMatch: 'full', component: PostsListComponent }
  ]},
  { path: 'messages', canActivate: [AuthGuard], component: MessagesListComponent },
  { path: '', pathMatch: 'full', redirectTo: 'posts' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
