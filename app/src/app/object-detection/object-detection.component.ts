import { Component } from '@angular/core';
import { MediaService } from '../services/media.service';
import { API } from '../app.models';

@Component({
  selector: 'app-object-detection',
  templateUrl: './object-detection.component.html',
  styleUrls: ['./object-detection.component.scss'],
})
export class ObjectDetectionComponent {
  mediaSrc: any;
  isVideo = false;
  resultSrc = '';
  results: any;

  constructor(public dataService: MediaService) {
    this.dataService.media$.subscribe(({ src, isVideo }) => {
      this.mediaSrc = src;
      this.isVideo = isVideo;
    });
    this.dataService.result$.subscribe(({ path, result }) => {
      this.resultSrc = (path && `${API}/${path}`) || '';
      this.results = (result && JSON.parse(result)) || [];
    });
  }
}
