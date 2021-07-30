import { Component } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { API } from '../app.models';

@Component({
  selector: 'app-video-detection',
  templateUrl: './video-detection.component.html',
  styleUrls: ['./video-detection.component.scss'],
})
export class VideoDetectionComponent {
  videoSrc: any;
  resultSrc = '';
  results: any;

  constructor(public dataService: DataService) {
    this.dataService.media$.subscribe(
      ({ src, isVideo }) => (this.videoSrc = isVideo && src)
    );
    this.dataService.result$.subscribe(({ path, result }) => {
      this.resultSrc = (path && `${API}/${path}`) || '';
      this.results = result && JSON.parse(result);
    });
  }
}
