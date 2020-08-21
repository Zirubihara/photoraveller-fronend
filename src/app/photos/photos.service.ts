import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PhotosModel } from './photos-response';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PhotosService {
  constructor(private http: HttpClient) { }

  getAllPhotos(): Observable<Array<PhotosModel>> {
    return this.http.get<Array<PhotosModel>>('http://localhost:8080/api/photos');
  }

  createPhotos(photosModel: PhotosModel): Observable<PhotosModel> {
    return this.http.post<PhotosModel>('http://localhost:8080/api/photos', photosModel);
  }

}
