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

  loadMedia(event: any): void {
    if (event?.target?.files && event?.target?.files[0]) {
      const file = event.target.files[0];
      const isVideo = file.type.includes('video');
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
  }

  startDetection() {
    this.dataService.detectMedia();
  }
}
