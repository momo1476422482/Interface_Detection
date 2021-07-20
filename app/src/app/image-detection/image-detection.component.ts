import { Component } from '@angular/core';
import { DataService } from '../services/data.service';

const RESULTS_MOCK = Object.freeze([
  {
    category: 'Human',
    score: '0,95',
  },
  {
    category: 'Car',
    score: '0,89',
  },
]);

const API = 'http://localhost:3000';

@Component({
  selector: 'app-image-detection',
  templateUrl: './image-detection.component.html',
  styleUrls: ['./image-detection.component.scss'],
})
export class ImageDetectionComponent {
  imageSrc: any;
  resultSrc = '';
  results = RESULTS_MOCK;

  constructor(public dataService: DataService) {
    this.dataService.media$.subscribe(
      ({ src, isVideo }) => (this.imageSrc = !isVideo && src)
    );
    this.dataService.result$.subscribe(
      ({ path }) => (this.resultSrc = (path && `${API}/${path}`) || '')
    );
  }
}
