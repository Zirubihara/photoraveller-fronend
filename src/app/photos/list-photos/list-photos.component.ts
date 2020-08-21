import {Component, OnInit} from '@angular/core';
import {PhotosModel} from '../photos-response';
import {PhotosService} from '../photos.service';
import {throwError} from 'rxjs';

@Component({
  selector: 'app-list-photos',
  templateUrl: './list-photos.component.html',
  styleUrls: ['./list-photos.component.css']
})
export class ListPhotosComponent implements OnInit {

  photos: Array<PhotosModel>;

  constructor(private photosService: PhotosService) {
  }

  ngOnInit(): void {
    this.photosService.getAllPhotos().subscribe(data => {
      this.photos = data;
    }, error => {
      throwError(error);
    });
  }
}
