import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { MultimediaPlayingService } from 'app/services/multimedia-playing.service';
import { SafeUrl } from '@angular/platform-browser';
import { Subscription } from 'rxjs';

@Component({
  selector: 'jhi-resource-video',
  templateUrl: './resource-video.component.html',
  styleUrls: ['./resource-video.component.scss']
})
export class ResourceVideoComponent implements OnInit {
  @Input() safeUrl?: SafeUrl | string;
  active = false;
  @ViewChild('video', { static: false }) video?: ElementRef;
  subscription?: Subscription;
  playing = false;

  constructor(private multimediaPlayingService: MultimediaPlayingService) {
    this.subscription = this.multimediaPlayingService.getActive().subscribe(active => {
      this.active = active;
    });
    this.subscription = this.multimediaPlayingService.getPlaying().subscribe(playing => {
      if (!this.active) {
        this.playing = playing;
        this.pauseVideo();
      }
    });
  }

  ngOnInit(): void {}

  toggleVideo(): void {
    this.multimediaPlayingService.setActive(false);
    this.active = true;
    this.multimediaPlayingService.setPlaying(false);
  }

  pauseVideo(): void {
    if (this.video) {
      this.video.nativeElement.pause();
    }
  }
}
