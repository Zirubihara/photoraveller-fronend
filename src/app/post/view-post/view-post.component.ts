import {Component, OnInit} from '@angular/core';
import {PostService} from '../../shared/post.service';
import {ActivatedRoute, Router} from '@angular/router';
import {PostModel} from '../../shared/post-model';
import {throwError} from 'rxjs';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {CommentService} from '../../comment/comment.service';
import {CommentPayload} from '../../comment/comment.payload';

@Component({
  selector: 'app-view-post',
  templateUrl: './view-post.component.html',
  styleUrls: ['./view-post.component.css']
})
export class ViewPostComponent implements OnInit {

  postId: number;
  post: PostModel;
  commentForm: FormGroup;
  commentPayload: CommentPayload;
  comments: CommentPayload[];

  constructor(private postService: PostService, private adtivateRoute: ActivatedRoute,
              private commentService: CommentService, private reouter: Router) {
    this.postId = this.adtivateRoute.snapshot.params.id;

    this.commentForm = new FormGroup({
      text: new FormControl('', Validators.required)
    });
    this.commentPayload = {
      text: '',
      postId: this.postId
    };
  }

  ngOnInit(): void {
    this.getPostById();
    this.getCommentsForPost();
  }

  postComment(): any {
    this.commentPayload.text = this.commentForm.get('text').value;
    this.commentService.postComment(this.commentPayload).subscribe(data => {
      this.commentForm.get('text').setValue('');
      this.getCommentsForPost();
    }, error => {
      throwError(error);
    });
  }

  private getPostById(): any {
    this.postService.getPost(this.postId).subscribe(data => {
      this.post = data;
    }, error => {
      throwError(error);
    });
  }

  private getCommentsForPost(): any {
    this.commentService.getAllCommentsForPost(this.postId).subscribe(data => {
      this.comments = data;
    }, error => {
      throwError(error);
    });
  }
}
