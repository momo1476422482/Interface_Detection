import { Component } from '@angular/core';
import { DataService } from '../services/data.service';
import { API } from '../app.models';

@Component({
  selector: 'app-image-detection',
  templateUrl: './image-detection.component.html',
  styleUrls: ['./image-detection.component.scss'],
})
export class ImageDetectionComponent {
  imageSrc: any;
  resultSrc = '';
  results: any;

  constructor(public dataService: DataService) {
    this.dataService.media$.subscribe(
      ({ src, isVideo }) => (this.imageSrc = !isVideo && src)
    );
    this.dataService.result$.subscribe(({ path, result }) => {
      this.resultSrc = (path && `${API}/${path}`) || '';
      this.results = result && JSON.parse(result);
    });
  }
}
