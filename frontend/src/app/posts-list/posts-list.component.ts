import { Component, OnInit } from '@angular/core';
import { PostsService } from '../services/posts.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Post } from '../models/Post.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.scss']
})
export class PostsListComponent implements OnInit {

  posts$: Observable<Post[]>;

  constructor(private posts: PostsService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.posts$ = this.posts.getPosts().pipe(
      map(response => response.results)
    );
  }

}
