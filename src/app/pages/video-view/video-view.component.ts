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
        src: 'http://img-ys011.didistatic.com/static/didiglobal/do1_pcUZZjSG7vFlMbdr8fA6#.mp4',
        type: 'video/mp4',
      });
      this.player.vr({ projection: '360' });
    });

    // error handling
    this.player.on('error', (error: any) => {
      console.warn(error);
    });
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
}
