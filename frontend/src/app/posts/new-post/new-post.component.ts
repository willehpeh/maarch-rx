import { Component, OnInit } from '@angular/core';
import { PostsService } from '../../services/posts.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Post } from '../../models/Post.model';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.scss']
})
export class NewPostComponent implements OnInit {

  postForm: FormGroup;
  mode = 'new';
  post: Post;

  constructor(private posts: PostsService,
              private router: Router,
              private formBuilder: FormBuilder,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.post = this.route.snapshot.data.post;
    this.postForm = this.formBuilder.group({
      title: ['', Validators.required],
      content: ['', Validators.required]
    });
    if (this.post) {
      this.mode = 'modify';
      this.postForm.get('title').patchValue(this.post.title);
      this.postForm.get('content').patchValue(this.post.content);
    }
  }

  onSubmit() {
    if (this.mode === 'new') {
      this.posts.newPost(this.postForm.get('title').value, this.postForm.get('content').value).subscribe(
        () => this.router.navigateByUrl(''),
        err => console.log(err)
      );
    } else if (this.mode === 'modify') {
      this.posts.modifyPost(this.post._id, this.postForm.get('title').value, this.postForm.get('content').value)
        .subscribe(
          () => this.router.navigateByUrl(''),
          err => console.log(err)
        );
    }
  }

}
