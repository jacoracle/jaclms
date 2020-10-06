import { Injectable } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

import { PdfModalComponent } from 'app/shared/pdf-preview/pdf-modal.component';
import { SafeUrl } from '@angular/platform-browser';

@Injectable({ providedIn: 'root' })
export class PdfModalService {
  private isOpen = false;
  id?: number;

  constructor(private modalService: NgbModal) {}

  open(pdfSrc: SafeUrl, id: number): void {
    this.id = id;
    if (this.isOpen) {
      return;
    }
    this.isOpen = true;
    const modalRef: NgbModalRef = this.modalService.open(PdfModalComponent);
    modalRef.componentInstance.pdfSrc = pdfSrc;
    modalRef.result.finally(() => (this.isOpen = false));
  }
}
