import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-action-buttons',
  templateUrl: './action-buttons.component.html',
  styleUrls: ['./action-buttons.component.scss'],
})
export class ActionButtonsComponent {
  constructor(
    private readonly router: Router,
    private readonly dataService: DataService
  ) {}

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

    if (isVideo) {
      this.router.navigate(['video']);
    } else {
      this.router.navigate(['image']);
    }
  }

  startDetection() {
    this.dataService.detectMedia();
  }
}
