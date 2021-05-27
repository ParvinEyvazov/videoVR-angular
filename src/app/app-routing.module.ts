import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FileUploadComponent } from './components/file-upload/file-upload.component';
import { VideoViewComponent } from './components/video-view/video-view.component';

const routes: Routes = [
  { path: 'file-upload', component: FileUploadComponent },
  { path: 'video-view/:url', component: VideoViewComponent },
  { path: '', redirectTo: '/file-upload', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
