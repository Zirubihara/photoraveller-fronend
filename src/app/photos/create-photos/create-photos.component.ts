import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {PhotosModel} from '../photos-response';
import {Router} from '@angular/router';
import {PhotosService} from '../photos.service';
import {throwError} from 'rxjs';

@Component({
  selector: 'app-create-photos',
  templateUrl: './create-photos.component.html',
  styleUrls: ['./create-photos.component.css']
})
export class CreatePhotosComponent implements OnInit {
  createdPhotosForm: FormGroup;
  photosModel: PhotosModel;
  title = new FormControl('');
  description = new FormControl('');

  constructor(private router: Router, private photosService: PhotosService) {
    this.createdPhotosForm = new FormGroup({
      title: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required)
    });
    this.photosModel = {
      name: '',
      description: ''
    };
  }

  ngOnInit(): void {
  }

  discard(): any {
    this.router.navigateByUrl('/');
  }

  createPhotos(): any {
    this.photosModel.name = this.createdPhotosForm.get('title').value;
    this.photosModel.description = this.createdPhotosForm.get('description').value;
    this.photosService.createPhotos(this.photosModel).subscribe(data => {
      this.router.navigateByUrl('/list-subreddits');
    }, error => {
      throwError(error);
    });
  }
}
