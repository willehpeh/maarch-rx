import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PostsListComponent } from './posts-list/posts-list.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { MessagesListComponent } from './messages-list/messages-list.component';

const routes: Routes = [
  { path: 'auth', children: [
      { path: 'login', component: LoginComponent },
      { path: 'signup', component: SignupComponent }
    ]},
  { path: 'posts', component: PostsListComponent },
  { path: 'messages', component: MessagesListComponent },
  { path: '', pathMatch: 'full', redirectTo: 'posts' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
