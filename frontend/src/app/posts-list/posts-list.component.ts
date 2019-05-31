import { Component, OnInit } from '@angular/core';
import { PostsService } from '../services/posts.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Post } from '../models/Post.model';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.scss']
})
export class PostsListComponent implements OnInit {

  posts$: Observable<Post[]>;
  isAuth$: Observable<boolean>;
  currentUser: string;

  constructor(private posts: PostsService,
              private route: ActivatedRoute,
              private auth: AuthService) { }

  ngOnInit() {
    this.posts$ = this.posts.getPosts().pipe(
      map(response => response.results)
    );
    this.isAuth$ = this.auth.getIsAuth();
    this.currentUser = this.auth.getCurrentUser();
  }

}
