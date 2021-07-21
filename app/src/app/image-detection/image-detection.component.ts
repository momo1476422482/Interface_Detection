import { Component } from '@angular/core';
import { DataService } from '../services/data.service';

const API = 'http://localhost:3000';

@Component({
  selector: 'app-image-detection',
  templateUrl: './image-detection.component.html',
  styleUrls: ['./image-detection.component.scss'],
})
export class ImageDetectionComponent {
  imageSrc: any;
  resultSrc = '';
  results: any;

  get objects() {
    return Object.keys(this.results);
  }

  getObjectScore(obj: string) {
    return Math.round(this.results[obj] * 100) / 100;
  }

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
