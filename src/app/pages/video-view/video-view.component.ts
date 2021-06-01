import {
  AfterViewInit,
  Component,
  OnInit,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import videojs from 'video.js';
import 'videojs-vr/dist/videojs-vr.js';

/*
import 'videojs-vr/dist/videojs-vr.js';
"./node_modules/videojs-vr/dist/videojs-vr.js"


"./node_modules/videojs-vr/dist/videojs-vr.css",
*/

@Component({
  selector: 'app-video-view',
  templateUrl: './video-view.component.html',
  styleUrls: ['./video-view.component.scss'],
})
export class VideoViewComponent implements OnInit, AfterViewInit {
  url: string = ' sd';
  readonly config: any;
  player: any;
  @ViewChild('my_video')
  element: ElementRef | undefined;

  constructor(private route: ActivatedRoute) {
    this.config = {
      controls: true,
      autoplay: false,
      fluid: false,
      loop: false,
      width: 640,
      height: 480,
    };
  }

  ngAfterViewInit(): void {
    // setup the player
    console.log(this.element?.nativeElement);
    this.player = videojs(this.element?.nativeElement, this.config, () => {
      console.log('Using video.js ' + videojs.VERSION);
      this.player.src({
        // src: 'https://storage.googleapis.com/download/storage/v1/b/hq-proje1-5b43f/o/6095b7c2db533d002cf66b09?alt=media&timestamp=1622535303368',
        src: 'https://storage.googleapis.com/download/storage/v1/b/hq-proje1-5b43f/o/60b616bc21d2b2002daefc58?alt=media&timestamp=1622546139654',
        // src: 'https://github.com/videojs/videojs-vr/blob/153c690f4141c3a8d7e9399a6019a459b093c318/samples/eagle-360.mp4?raw=true',

        // src: this.url,
        type: 'video/mp4',
      });
    });

    // this.player.vr({ projection: '360' }).cameraVector;
    this.player.mediainfo = this.player.mediainfo || {};
    // this.player.mediainfo.projection = '360_TB';

    this.player.vr({
      projection: '360',
      // debug: true,
      forceCardboard: false,
    });

    // error handling
    this.player.on('error', (error: any) => {
      console.warn(error);
    });

    // setTimeout(() => {
    //   this.player.pause(); // pause video
    //   this.player.currentTime(100); // get this time
    // }, 6000);

    // setTimeout(() => {
    //   var whereYouAt = this.player.currentTime(); // get current time
    //   console.log(whereYouAt);
    //   this.player.controls(false); // hide control
    //   this.player.play(); // play video
    // }, 8000);
  }

  ngOnInit() {
    this.url = decodeURIComponent(
      this.route.snapshot.paramMap.get('url') || ''
    );
    // this.url = 'ss';
    // let a: string = this.route.snapshot.paramMap.get('url') || '';
    // this.url = decodeURIComponent(a);
    // console.log(decodeURIComponent(a));
  }

  play() {
    this.player.play();
  }

  pause() {
    this.player.pause();
  }

  go(time: number) {
    this.player.currentTime(time);
  }

  hideControl() {
    this.player.controls(false);
  }

  showControl() {
    this.player.controls(true);
  }
}
