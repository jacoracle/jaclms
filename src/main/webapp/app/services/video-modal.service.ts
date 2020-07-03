import { Injectable } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { SafeUrl } from '@angular/platform-browser';
import { VideoModalComponent } from 'app/shared/video-preview/video-modal.component';

@Injectable({ providedIn: 'root' })
export class VideoModalService {
  private isOpen = false;

  constructor(private modalService: NgbModal) {}

  open(videoSrc: SafeUrl): void {
    if (this.isOpen) {
      return;
    }
    this.isOpen = true;
    const modalRef: NgbModalRef = this.modalService.open(VideoModalComponent);
    modalRef.componentInstance.videoSrc = videoSrc;
    modalRef.result.finally(() => (this.isOpen = false));
  }
}
