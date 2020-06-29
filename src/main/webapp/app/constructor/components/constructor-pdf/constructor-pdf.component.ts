import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { NavigationControlsService } from 'app/services/navigation-controls.service';
import { Componente } from 'app/shared/model/componente.model';
import { FileUploadService } from 'app/services/file-upload.service';
import { PdfService } from 'app/services/pdf.service';

@Component({
  selector: 'jhi-constructor-pdf',
  templateUrl: './constructor-pdf.component.html',
  styleUrls: ['./constructor-pdf.component.scss']
})
export class ConstructorPdfComponent implements OnInit, OnDestroy {
  defaultPdfUrl: SafeUrl = './../../../../content/images/pdf_upload.png';
  pdfSrc: SafeUrl = '';
  editing = false;
  subscription: Subscription;
  @Input() component?: Componente;
  @Output() updateComponent = new EventEmitter();

  constructor(
    public pdfService: PdfService,
    public navigationControlsService: NavigationControlsService,
    public fileUploadService: FileUploadService,
    private domSanitizer: DomSanitizer
  ) {
    this.subscription = this.pdfService.getEditing().subscribe(editing => (this.editing = editing));
    this.subscription = this.pdfService.getPdfSrc().subscribe(pdfSrc => {
      if (this.editing) {
        this.pdfSrc = pdfSrc;
      }
    });
    this.subscription = this.pdfService.getPathUrl().subscribe(pathUrl => {
      if (this.editing) {
        this.updateComponent.emit({ newValue: pathUrl, type: 'image' });
      }
    });
  }

  selectPdf(): void {
    this.pdfService.setEditing(false);
    this.pdfService.setPdfSrc(this.pdfSrc);
    this.editing = true;
    this.navigationControlsService.setOpenProperties(true);
  }

  public getPdf(path: string): void {
    this.fileUploadService.getPdfPreviewFile(path).subscribe(data => {
      const pdfPath = URL.createObjectURL(data.body);
      this.pdfSrc = this.domSanitizer.bypassSecurityTrustResourceUrl(pdfPath);
    });
  }

  ngOnInit(): void {
    if (this.component && this.component.contenido && this.component.contenido.contenido !== '') {
      this.getPdf(this.component.contenido.contenido!);
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
