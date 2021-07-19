import { DataService } from 'src/app/services/data.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-video-detection',
  templateUrl: './video-detection.component.html',
  styleUrls: ['./video-detection.component.scss'],
})
export class VideoDetectionComponent {
  videoSrc: any;

  constructor(private readonly dataService: DataService) {
    this.dataService.media$.subscribe(
      ({ src, isVideo }) => (this.videoSrc = isVideo && src)
    );
  }
}
