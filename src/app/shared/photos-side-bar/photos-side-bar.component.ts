import {Component, OnInit} from '@angular/core';
import {PhotosService} from '../../photos/photos.service';
import {PhotosModel} from '../../photos/photos-response';

@Component({
  selector: 'app-photos-side-bar',
  templateUrl: './photos-side-bar.component.html',
  styleUrls: ['./photos-side-bar.component.css']
})
export class PhotosSideBarComponent implements OnInit {

  photos: Array<PhotosModel> = [];
  displayViewAll: boolean;

  constructor(private photosService: PhotosService) {
    this.photosService.getAllPhotos().subscribe(data => {
      if (data.length > 3) {
        this.photos = data.splice(0, 3);
        this.displayViewAll = true;
      } else {
        this.photos = data;
      }
    });
  }

  ngOnInit(): void {
  }

}
