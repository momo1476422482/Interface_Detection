import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

interface Media {
  src: string | ArrayBuffer | null;
  isVideo: boolean;
}

const API = 'http://localhost:3000';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private file: any;
  private mediaSubject: BehaviorSubject<Media>;
  public media$: Observable<Media>;
  get media(): Media {
    return this.mediaSubject.value;
  }

  constructor(
    private readonly router: Router,
    private readonly http: HttpClient
  ) {
    this.file = null;
    this.mediaSubject = new BehaviorSubject<Media>({
      src: null,
      isVideo: false,
    });
    this.media$ = this.mediaSubject.asObservable();
  }

  loadMedia(file: any, media: any, isVideo: boolean) {
    this.file = file;
    this.mediaSubject.next({ src: media, isVideo });
  }

  detectMedia() {
    let formData: FormData = new FormData();
    formData.append('file', this.file, this.file.name);
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    headers.append('Accept', 'application/json');
    this.http
      .post(`${API}/testUploadFile`, formData, { headers })
      .pipe(map((res: any) => res.json()))
      .subscribe(
        (data: any) => console.log('success', data),
        (error: any) => console.log(error)
      );
  }
}
