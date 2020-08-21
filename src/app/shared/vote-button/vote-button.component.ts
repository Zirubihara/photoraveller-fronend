import {Component, Input, OnInit} from '@angular/core';
import {PostModel} from '../post-model';
import {faArrowDown, faArrowUp} from '@fortawesome/free-solid-svg-icons';
import {VoteType} from './vote-type';
import {VotePayload} from './vote-payload';
import {VoteService} from '../vote.service';
import {AuthService} from '../../auth/shared/auth.service';
import {PostService} from '../post.service';
import {ToastrService} from 'ngx-toastr';
import {throwError} from 'rxjs';

@Component({
  selector: 'app-vote-button',
  templateUrl: './vote-button.component.html',
  styleUrls: ['./vote-button.component.css']
})
export class VoteButtonComponent implements OnInit {

  @Input() post: PostModel;
  votePayload: VotePayload;
  faArrowUp = faArrowUp;
  faArrowDown = faArrowDown;
  upvoteColor: string;
  downvoteColor: string;
  isLoggedIn: boolean;
  toastr: any;

  constructor(private voteService: VoteService, private authService: AuthService, private postService: PostService,
              toastr: ToastrService) {
    this.votePayload = {
      voteType: undefined,
      postId: undefined
    };
    this.authService.loggedIn.subscribe((data: boolean) => this.isLoggedIn = data);
  }

  ngOnInit(): void {
  }

  upvotePost(): any {
    this.votePayload.voteType = VoteType.UPVOTE;
    this.vote();
    this.downvoteColor = '';
  }

  downvotePost(): any {
    this.votePayload.voteType = VoteType.DOWNVOTE;
    this.vote();
    this.upvoteColor = '';
  }

  private vote(): any {
    this.votePayload.postId = this.post.id;
    this.voteService.vote(this.votePayload).subscribe(() => {
      this.updateVoteDeatails();
    }, error => {
      this.toastr.error(error.error.message);
      throwError(error);
    });
  }

  private updateVoteDeatails(): any {
    this.postService.getPost(this.post.id).subscribe(post => {
      this.post = post;
    });
  }
}
