import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ToolbarNavComponent } from './nav/toolbar-nav/toolbar-nav.component';
import { LeftNavComponent } from './nav/left-nav/left-nav.component';
import { ImageDetectionComponent } from './image-detection/image-detection.component';
import { VideoDetectionComponent } from './video-detection/video-detection.component';
import { ActionButtonsComponent } from './shared/action-buttons/action-buttons.component';
import { ScoresComponent } from './shared/scores/scores.component';

@NgModule({
  declarations: [
    AppComponent,
    ToolbarNavComponent,
    LeftNavComponent,
    ImageDetectionComponent,
    VideoDetectionComponent,
    ActionButtonsComponent,
    ScoresComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
