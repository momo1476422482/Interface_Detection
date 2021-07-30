import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
// COMPONENTS
import { AppComponent } from './app.component';
import { ToolbarNavComponent } from './toolbar-nav/toolbar-nav.component';
import { ActionButtonsComponent } from './object-detection/action-buttons/action-buttons.component';
import { ObjectDetectionComponent } from './object-detection/object-detection.component';
import { ScoresComponent } from './object-detection/scores/scores.component';

@NgModule({
  declarations: [
    AppComponent,
    ToolbarNavComponent,
    ActionButtonsComponent,
    ObjectDetectionComponent,
    ScoresComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
