import { AfterViewInit, Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'jhi-pdf-modal',
  templateUrl: './pdf-modal.component.html',
  styleUrls: ['./pdf-modal.component.scss']
})
export class PdfModalComponent implements AfterViewInit {
  pdfSrc: any;
  typePdf = 'application/pdf';

  constructor(public activeModal: NgbActiveModal) {}

  ngAfterViewInit(): void {}
}
