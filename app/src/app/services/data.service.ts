import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

interface Media {
  src: string | ArrayBuffer | null;
  isVideo: boolean;
}

interface Result {
  path: string;
}

const API = 'http://localhost:3000';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  public isLoading = false;
  private file: any;
  // media to be analyzed
  private mediaSubject: BehaviorSubject<Media>;
  public media$: Observable<Media>;
  get media(): Media {
    return this.mediaSubject.value;
  }
  // analyze result
  private resultSubject: BehaviorSubject<Result>;
  public result$: Observable<Result>;
  get result(): Result {
    return this.resultSubject.value;
  }

  constructor(
    private readonly router: Router,
    private readonly http: HttpClient
  ) {
    this.file = null;
    // init media
    this.mediaSubject = new BehaviorSubject<Media>({
      src: null,
      isVideo: false,
    });
    this.media$ = this.mediaSubject.asObservable();
    // init result
    this.resultSubject = new BehaviorSubject<Result>({
      path: '',
    });
    this.result$ = this.resultSubject.asObservable();
  }

  loadMedia(file: any, media: any, isVideo: boolean) {
    this.file = file;
    this.mediaSubject.next({ src: media, isVideo });
  }

  detectMedia() {
    if (!this.file) {
      return;
    }
    // prepare file for request
    let formData: FormData = new FormData();
    formData.append('file', this.file, this.file.name);
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    headers.append('Accept', 'application/json');

    // start analyzing
    this.isLoading = true;
    this.http
      .post(`${API}/startDetectionImage`, formData, { headers })
      .subscribe(
        (result: any) => {
          this.resultSubject.next(result);
          this.isLoading = false;
        },
        (error: any) => {
          console.log(error);
          this.isLoading = false;
        }
      );
  }
}
