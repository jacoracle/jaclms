import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { VideoService } from 'app/services/video.service';
import { Componente } from 'app/shared/model/componente.model';
import { NavigationControlsService } from 'app/services/navigation-controls.service';
import { FileUploadService } from 'app/services/file-upload.service';
import { Contenido, IContenido } from 'app/shared/model/contenido.model';
import { JhiEventManager, JhiEventWithContent } from 'ng-jhipster';
import { ContenidoService } from 'app/entities/contenido/contenido.service';

@Component({
  selector: 'jhi-constructor-video',
  templateUrl: './constructor-video.component.html',
  styleUrls: ['./constructor-video.component.scss']
})
export class ConstructorVideoComponent implements OnInit, OnDestroy {
  defaultVideoUrl: SafeUrl = './../../../../content/images/video.png';
  videoSrc: SafeUrl = '';
  thumbSrc: SafeUrl = '';
  pathUrl = '';
  editing = false;
  subscription: Subscription;
  @Input() component?: Componente;
  @Output() updateComponent = new EventEmitter();
  showLoader = false;

  constructor(
    public videoService: VideoService,
    private contenidoService: ContenidoService,
    private eventManager: JhiEventManager,
    public navigationControlsService: NavigationControlsService,
    public fileUploadService: FileUploadService,
    private domSanitizer: DomSanitizer
  ) {
    this.subscription = this.videoService.getEditing().subscribe(editing => (this.editing = editing));

    this.subscription = this.videoService.getVideoProperties().subscribe((objProperties: IContenido) => {
      if (this.editing && this.component!.contenido!.id) {
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

    this.subscription = this.videoService.getThumbSrc().subscribe(thumbSrc => {
      if (this.editing) {
        this.thumbSrc = thumbSrc;
      }
    });
    /*
    this.subscription = this.videoService.getVideoSrc().subscribe(videoSrc => {
      if (this.editing) {
        this.videoSrc = videoSrc;
      }
    });
    */
    this.subscription = this.videoService.getThumbSrc().subscribe(thumbSrc => {
      if (this.editing) {
        this.thumbSrc = thumbSrc;
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

  selectVideo(): void {
    this.videoService.setEditing(false);
    this.videoService.setThumbSrc(this.thumbSrc);
    this.videoService.setVideoProperties(this.component!.contenido!);
    this.editing = true;
    this.navigationControlsService.setOpenProperties(true);
  }

  public getVideo(path: string): void {
    this.showLoader = true;
    this.fileUploadService.getVideoThumbnailFile(path).subscribe(data => {
      this.showLoader = false;
      const videoPath = URL.createObjectURL(data.body);
      this.thumbSrc = this.domSanitizer.bypassSecurityTrustUrl(videoPath);
    });
  }

  ngOnInit(): void {
    if (this.component && this.component.contenido && this.component.contenido.contenido !== '') {
      this.pathUrl = this.component.contenido.contenido!;
      this.getVideo(this.component.contenido.contenido!);
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
