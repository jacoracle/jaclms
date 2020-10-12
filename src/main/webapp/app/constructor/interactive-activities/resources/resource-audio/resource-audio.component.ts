import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { SafeUrl } from '@angular/platform-browser';
import { MultimediaPlayingService } from 'app/services/multimedia-playing.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'jhi-resource-audio',
  templateUrl: './resource-audio.component.html',
  styleUrls: ['./resource-audio.component.scss']
})
export class ResourceAudioComponent implements OnInit {
  @Input() safeUrl?: SafeUrl;
  active = false;
  @ViewChild('audio', { static: false }) audio?: ElementRef;
  subscription?: Subscription;
  playing = false;

  constructor(private multimediaPlayingService: MultimediaPlayingService) {
    this.subscription = this.multimediaPlayingService.getActive().subscribe(active => {
      this.active = active;
    });
    this.subscription = this.multimediaPlayingService.getPlaying().subscribe(playing => {
      if (!this.active) {
        this.playing = playing;
        this.pauseAudio();
      }
    });
  }

  ngOnInit(): void {}

  toggleAudio(): void {
    this.multimediaPlayingService.setActive(false);
    this.active = true;
    this.multimediaPlayingService.setPlaying(false);
  }

  pauseAudio(): void {
    if (this.audio) {
      this.audio.nativeElement.pause();
    }
  }
}
