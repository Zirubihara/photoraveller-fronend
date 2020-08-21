import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { PhotosModel } from '../../photos/photos-response';
import { Router } from '@angular/router';
import { PostService } from '../../shared/post.service';
import { PhotosService } from '../../photos/photos.service';
import { throwError } from 'rxjs';
import { CreatePostPayload } from './createPostPayload';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {

  createPostForm: FormGroup;
  postPayload: CreatePostPayload;
  photos: Array<PhotosModel>;

  constructor(private router: Router, private postservice: PostService, private photosService: PhotosService) {
    this.postPayload = {
      postName: '',
        url: '',
        description: '',
        photosName: ''
    };
  }

  ngOnInit(): void {
    this.createPostForm = new FormGroup({
      postName: new FormControl('', Validators.required),
      photosName: new FormControl('', Validators.required),
      url: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
    });
    this.photosService.getAllPhotos().subscribe((data) => {
      this.photos = data;
    }, error => {
      throwError(error);
    });
  }

  createPost(): any {
    this.postPayload.postName = this.createPostForm.get('postName').value;
    this.postPayload.photosName = this.createPostForm.get('photosNanme').value;
    this.postPayload.url = this.createPostForm.get('url').value;
    this.postPayload.description = this.createPostForm.get('description').value;

    this.postservice.createPost(this.postPayload).subscribe((data) => {
      this.router.navigateByUrl('/');
    }, error => {
      throwError(error);
    });
  }

  discardPost(): any {
    this.router.navigateByUrl('/');
  }

}
