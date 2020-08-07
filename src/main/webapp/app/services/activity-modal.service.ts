import { Injectable } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ActivityModalComponent } from 'app/shared/activity-preview/activity-modal.component';

@Injectable({ providedIn: 'root' })
export class ActivityModalService {
  private isOpen = false;

  constructor(private modalService: NgbModal) {}

  open(): void {
    if (this.isOpen) {
      return;
    }
    this.isOpen = true;
    const modalRef: NgbModalRef = this.modalService.open(ActivityModalComponent);
    // modalRef.componentInstance.videoSrc = videoSrc;
    modalRef.result.finally(() => (this.isOpen = false));
  }
}
