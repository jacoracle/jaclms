import { Injectable } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { UmaPreviewModalComponent } from 'app/shared/uma-preview/uma-preview.component';

@Injectable({ providedIn: 'root' })
export class UmaPreviewModalService {
  private isOpen = false;

  constructor(private modalService: NgbModal) {}

  open(sequence: any): void {
    // console.error('UMA Preview Modal Service: ', sequence);
    if (this.isOpen) {
      return;
    }
    this.isOpen = true;
    const modalRef: NgbModalRef = this.modalService.open(UmaPreviewModalComponent);
    modalRef.componentInstance.umaData = sequence;
    modalRef.result.finally(() => (this.isOpen = false));
  }
}
