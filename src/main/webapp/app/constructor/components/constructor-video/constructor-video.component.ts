import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { SafeUrl, DomSanitizer } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { VideoService } from 'app/services/video.service';
import { Componente } from 'app/shared/model/componente.model';
import { NavigationControlsService } from 'app/services/navigation-controls.service';
import { FileUploadService } from 'app/services/file-upload.service';
import { IContenido, Contenido } from 'app/shared/model/contenido.model';
import { JhiEventWithContent, JhiEventManager } from 'ng-jhipster';
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
  @Output() updateMultimediaProperties = new EventEmitter<IContenido>();
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
    this.subscription = this.videoService.getPathUrl().subscribe(pathUrl => {
      if (this.editing) {
        this.pathUrl = pathUrl;
        this.updateComponent.emit({ newValue: pathUrl, type: 'video' });
      }
    });

    this.subscription = this.videoService.getVideoProperties().subscribe((objProperties: IContenido) => {
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

  selectVideo(): void {
    this.videoService.setEditing(false);
    this.videoService.setThumbSrc(this.thumbSrc);
    this.videoService.setPathUrl(this.pathUrl);
    this.videoService.setVideoProperties(this.component!.contenido!);
    this.editing = true;
    this.navigationControlsService.setOpenProperties(true);
  }

  public getVideo(path: string): void {
    this.showLoader = true;
    this.fileUploadService.getVideoThumbnailFile(path).subscribe(data => {
      this.showLoader = false;
      const videoPath = URL.createObjectURL(data.body);
      const objectUrl = this.domSanitizer.bypassSecurityTrustUrl(videoPath);
      this.thumbSrc = objectUrl;
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
