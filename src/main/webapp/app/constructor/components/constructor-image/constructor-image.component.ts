import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { ImageService } from 'app/services/image.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { NavigationControlsService } from 'app/services/navigation-controls.service';
import { Componente } from 'app/shared/model/componente.model';
import { FileUploadService } from 'app/services/file-upload.service';
import { Contenido, IContenido } from 'app/shared/model/contenido.model';
import { ContenidoService } from 'app/entities/contenido/contenido.service';
import { JhiEventManager, JhiEventWithContent } from 'ng-jhipster';

@Component({
  selector: 'jhi-constructor-image',
  templateUrl: './constructor-image.component.html',
  styleUrls: ['./constructor-image.component.scss']
})
export class ConstructorImageComponent implements OnInit, OnDestroy {
  defaultImageUrl: SafeUrl = './../../../../content/images/img_layout3.png';
  imgSrc: SafeUrl = '';
  editing = false;
  subscription: Subscription;
  @Input() component?: Componente;
  @Output() updateComponent = new EventEmitter();
  showLoader = false;

  constructor(
    public imageService: ImageService,
    public navigationControlsService: NavigationControlsService,
    public fileUploadService: FileUploadService,
    private domSanitizer: DomSanitizer,
    private contenidoService: ContenidoService,
    private eventManager: JhiEventManager
  ) {
    this.subscription = this.imageService.getEditing().subscribe(editing => (this.editing = editing));
    this.subscription = this.imageService.getImgSrc().subscribe(imgSrc => {
      if (this.editing) {
        this.imgSrc = imgSrc;
      }
    });

    this.subscription = this.imageService.getImageProperties().subscribe((objProperties: IContenido) => {
      if (this.editing) {
        this.updateComponent.emit(objProperties);
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

  selectImage(): void {
    this.imageService.setEditing(false);
    this.imageService.setImgSrc(this.imgSrc);
    this.imageService.setImageProperties(this.component!.contenido!);
    this.editing = true;
    this.navigationControlsService.setOpenProperties(true);
  }

  public getImage(path: string): void {
    this.showLoader = true;
    this.fileUploadService.getImageFile(path).subscribe(data => {
      this.showLoader = false;
      const imagePath = URL.createObjectURL(data.body);
      this.imgSrc = this.domSanitizer.bypassSecurityTrustUrl(imagePath);
    });
  }

  ngOnInit(): void {
    if (this.component && this.component.contenido && this.component.contenido.contenido !== '') {
      this.getImage(this.component.contenido.contenido!);
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
