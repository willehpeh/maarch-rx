import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Post } from '../../models/Post.model';
import { EMPTY, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { PostsService } from '../posts.service';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PostResolver implements Resolve<Post> {

  constructor(private posts: PostsService,
              private router: Router) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Post> | Promise<Post> | Post {
    const id = route.paramMap.get('id');
    return this.posts.getPost(id).pipe(
      catchError(err => {
        this.router.navigateByUrl('posts');
        return EMPTY;
      })
    );
  }

}
