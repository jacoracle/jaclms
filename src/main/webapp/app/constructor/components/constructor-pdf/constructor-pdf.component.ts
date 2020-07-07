import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { NavigationControlsService } from 'app/services/navigation-controls.service';
import { Componente } from 'app/shared/model/componente.model';
import { FileUploadService } from 'app/services/file-upload.service';
import { PdfService } from 'app/services/pdf.service';
import { IContenido, Contenido } from 'app/shared/model/contenido.model';
import { ContenidoService } from 'app/entities/contenido/contenido.service';
import { JhiEventManager, JhiEventWithContent } from 'ng-jhipster';

@Component({
  selector: 'jhi-constructor-pdf',
  templateUrl: './constructor-pdf.component.html',
  styleUrls: ['./constructor-pdf.component.scss']
})
export class ConstructorPdfComponent implements OnInit, OnDestroy {
  defaultPdfUrl: SafeUrl = './../../../../content/images/pdf_layout.png';
  loadedPdfUrl: SafeUrl = './../../../../content/images/pdf_up_layout.png';
  pdfSrc: SafeUrl = '';
  pathUrl = '';
  editing = false;
  subscription: Subscription;
  @Input() component?: Componente;
  @Output() updateComponent = new EventEmitter();
  @Output() updateMultimediaProperties = new EventEmitter<IContenido>();
  showLoader = false;

  constructor(
    public pdfService: PdfService,
    private contenidoService: ContenidoService,
    private eventManager: JhiEventManager,
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

    this.subscription = this.pdfService.getPdfProperties().subscribe((objProperties: IContenido) => {
      if (this.editing) {
        this.updateMultimediaProperties.emit(objProperties);
        // Actualizar contenido de componente en base de datos
        const contenido = this.createUpdatedContent(this.component!.contenido!, objProperties);
        this.subscription = this.contenidoService.update(contenido).subscribe(
          data => {
            this.component!.contenido = data.body!;
          },
          () => {
            this.eventManager.broadcast(
              new JhiEventWithContent('constructorApp.blockUpdateError', {
                message: 'constructorApp.curso.blockUpdate.error',
                type: 'danger'
              })
            );
          }
        );
      }
    });
  }

  createUpdatedContent(content: IContenido, newContent: IContenido): IContenido {
    return {
      ...new Contenido(),
      id: content.id,
      contenido: newContent.contenido,
      nombre: newContent.nombre,
      extension: newContent.extension,
      peso: newContent.peso
    };
  }

  selectPdf(): void {
    this.pdfService.setEditing(false);
    this.pdfService.setPdfSrc(this.pdfSrc);
    this.pdfService.setPdfProperties(this.component!.contenido!);
    this.editing = true;
    this.navigationControlsService.setOpenProperties(true);
  }

  public getPdf(path: string): void {
    this.showLoader = true;
    this.fileUploadService.getPdfPreviewFile(path).subscribe(data => {
      this.showLoader = false;
      const pdfPath = URL.createObjectURL(data.body);
      this.pdfSrc = this.domSanitizer.bypassSecurityTrustResourceUrl(pdfPath);
    });
  }

  ngOnInit(): void {
    if (this.component && this.component.contenido && this.component.contenido.contenido !== '') {
      this.pathUrl = this.component.contenido.contenido!;
      this.getPdf(this.component.contenido.contenido!);
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
