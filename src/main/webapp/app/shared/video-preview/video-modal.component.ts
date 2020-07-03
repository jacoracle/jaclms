import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'jhi-video-modal',
  templateUrl: './video-modal.component.html',
  styleUrls: ['./video-modal.component.scss']
})
export class VideoModalComponent implements AfterViewInit {
  videoSrc: any;
  @ViewChild('vPlayer', { static: false }) videoplayer: ElementRef | undefined;

  constructor(public activeModal: NgbActiveModal) {}

  ngAfterViewInit(): void {
    setTimeout(() => {
      if (this.videoplayer) {
        this.videoplayer.nativeElement.play();
      }
    }, 1000);
  }
}
