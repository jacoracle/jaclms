import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { Componente } from 'app/shared/model/componente.model';
import { NavigationControlsService } from 'app/services/navigation-controls.service';
import { FileUploadService } from 'app/services/file-upload.service';
import { Contenido, IContenido } from 'app/shared/model/contenido.model';
import { JhiEventManager, JhiEventWithContent } from 'ng-jhipster';
import { ContenidoService } from 'app/entities/contenido/contenido.service';
import { ActivityService } from 'app/services/activity.service';

@Component({
  selector: 'jhi-constructor-activity',
  templateUrl: './constructor-activity.component.html',
  styleUrls: ['./constructor-activity.component.scss']
})
export class ConstructorActivityComponent implements OnInit, OnDestroy {
  defaultActivityUrl: SafeUrl = './../../../../content/images/actividad.png';
  activitySrc: SafeUrl = '';
  pathUrl = '';
  editing = false;
  subscription: Subscription;
  @Input() component?: Componente;
  @Output() updateComponent = new EventEmitter();
  showLoader = false;

  constructor(
    public activityService: ActivityService,
    private contenidoService: ContenidoService,
    private eventManager: JhiEventManager,
    public navigationControlsService: NavigationControlsService,
    public fileUploadService: FileUploadService,
    private domSanitizer: DomSanitizer
  ) {
    this.subscription = this.activityService.getEditing().subscribe(editing => (this.editing = editing));

    this.subscription = this.activityService.getActivitySrc().subscribe(activitySrc => {
      if (this.editing) {
        this.activitySrc = activitySrc;
      }
    });

    this.subscription = this.activityService.getActivityProperties().subscribe((objProperties: IContenido) => {
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

  selectActivity(): void {
    this.activityService.setEditing(false);
    this.activityService.setActivitySrc(this.activitySrc);
    this.activityService.setActivityProperties(this.component!.contenido!);
    this.editing = true;
    this.navigationControlsService.setOpenProperties(true);
  }

  public getActivity(path: string): void {
    this.showLoader = true;
    this.fileUploadService.getVideoThumbnailFile(path).subscribe(data => {
      this.showLoader = false;
      const videoPath = URL.createObjectURL(data.body);
      this.activitySrc = this.domSanitizer.bypassSecurityTrustUrl(videoPath);
    });
  }

  ngOnInit(): void {
    if (this.component && this.component.contenido && this.component.contenido.contenido !== '') {
      this.pathUrl = this.component.contenido.contenido!;
      this.getActivity(this.component.contenido.contenido!);
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
