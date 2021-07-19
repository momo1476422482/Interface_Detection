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

@Component({
  selector: 'app-image-detection',
  templateUrl: './image-detection.component.html',
  styleUrls: ['./image-detection.component.scss'],
})
export class ImageDetectionComponent {
  imageSrc: any;
  results = RESULTS_MOCK;

  constructor(private readonly dataService: DataService) {
    this.dataService.media$.subscribe(
      ({ src, isVideo }) => (this.imageSrc = !isVideo && src)
    );
  }
}
