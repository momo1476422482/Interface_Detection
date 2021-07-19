import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VideoDetectionComponent } from './video-detection/video-detection.component';
import { ImageDetectionComponent } from './image-detection/image-detection.component';

const routes: Routes = [
	{ path: '', redirectTo: 'image', pathMatch: 'full' },
	{
		path: 'image',
    component: ImageDetectionComponent,

	},
	{
		path: 'video',
    component: VideoDetectionComponent
	}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
