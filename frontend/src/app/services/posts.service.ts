import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Config } from '../config/config';
import { Observable } from 'rxjs';
import { Post } from '../models/Post.model';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(private http: HttpClient,
              private config: Config) {}

  private apiUrl = this.config.apiUrl;

  getPosts(pageNumber: number = 1, pageSize: number = 20) {
    return this.http.get<{ totalPages: number, results: Post[] }>(`${this.apiUrl}/posts?pageNumber=${pageNumber}&pageSize=${pageSize}`);
  }

  getPost(id: string) {
    return this.http.get<Post>(`${this.apiUrl}/posts/${id}`);
  }

  modifyPost(id: string, title: string, content: string) {
    return this.http.put(`${this.apiUrl}/posts/modify/${id}`, { post: { title, content } });
  }

  newPost(title: string, content: string) {
    return this.http.post(`${this.apiUrl}/posts/new-post`, { post: { title, content }});
  }
}
