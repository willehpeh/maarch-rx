import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { AuthGuard } from './services/guards/auth.guard';

const routes: Routes = [
  { path: 'auth', children: [
      { path: 'login', component: LoginComponent },
      { path: 'signup', component: SignupComponent }
    ]},
  { path: 'posts', canActivate: [AuthGuard], loadChildren: () => import('./posts/posts.module').then(mod => mod.PostsModule)},
  { path: '', pathMatch: 'full', redirectTo: 'posts' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
