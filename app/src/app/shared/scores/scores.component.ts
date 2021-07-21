import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-scores',
  templateUrl: './scores.component.html',
  styleUrls: ['./scores.component.scss'],
})
export class ScoresComponent {
  @Input() results: any;

  roundScore(score: any) {
    return Math.round(score * 100) / 100;
  }
}
