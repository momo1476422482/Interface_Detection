import { Component } from '@angular/core';
import { MediaService } from 'src/app/services/media.service';

@Component({
  selector: 'app-action-buttons',
  templateUrl: './action-buttons.component.html',
  styleUrls: ['./action-buttons.component.scss'],
})
export class ActionButtonsComponent {
  constructor(private readonly dataService: MediaService) {}

  loadImage(event: any) {
    if (event?.target?.files && event?.target?.files[0]) {
      const file = event.target.files[0];
      if (file.type.includes('image')) {
        this.loadMedia(file, false);
      }
    }
  }

  loadVideo(event: any) {
    if (event?.target?.files && event?.target?.files[0]) {
      const file = event.target.files[0];
      if (file.type.includes('video')) {
        this.loadMedia(file, true);
      }
    }
  }

  loadMedia(file: any, isVideo: boolean): void {
    const reader = new FileReader();
    reader.onload = (e) =>
      this.dataService.loadMedia(file, reader.result, isVideo);
    reader.readAsDataURL(file);
  }

  startDetection() {
    this.dataService.detectMedia();
  }
}
