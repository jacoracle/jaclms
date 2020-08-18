import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { Componente } from 'app/shared/model/componente.model';
import { NavigationControlsService } from 'app/services/navigation-controls.service';
import { FileUploadService } from 'app/services/file-upload.service';
import { JhiEventManager, JhiEventWithContent } from 'ng-jhipster';
import { ActivityService } from 'app/services/activity.service';
import { ActividadInteractiva, IActividadInteractiva } from 'app/shared/model/actividad-interactiva.model';
import { ContenidoActividadService } from 'app/entities/contenido/contenido-actividad.service';

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
    private contenidoActividadService: ContenidoActividadService,
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

    this.subscription = this.activityService.getActivityProperties().subscribe((objProperties: IActividadInteractiva[]) => {
      if (this.component!.actividadesInteractivas) {
        const indexActividad = this.component!.actividadesInteractivas.length - 1;
        if (this.editing && indexActividad !== undefined) {
          this.updateComponent.emit(objProperties);
          // Actualizar contenido de componente en base de datos
          const contenidoActividad = this.createUpdatedActividad(
            this.component!.actividadesInteractivas[indexActividad],
            objProperties[indexActividad]
          );
          this.subscription = this.contenidoActividadService.update(contenidoActividad).subscribe(
            data => {
              this.component!.actividadesInteractivas![indexActividad] = data.body!;
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
      }
    });
  }

  createUpdatedActividad(content: ActividadInteractiva, newContent: ActividadInteractiva): IActividadInteractiva {
    if (content.contenido && newContent.contenido) {
      return {
        ...new ActividadInteractiva(),
        id: content.id,
        contenido: newContent.contenido,
        evaluable: newContent.evaluable,
        intentos: newContent.intentos,
        gamificacion: newContent.gamificacion
      };
    } else {
      return content;
    }
  }

  selectActivity(): void {
    this.activityService.setEditing(false);
    this.activityService.setActivitySrc(this.activitySrc);
    this.activityService.setActivityProperties(this.component!.actividadesInteractivas!);
    this.editing = true;
    this.navigationControlsService.setOpenProperties(true);
  }

  public getActivity(path: string): void {
    this.showLoader = true;
    this.fileUploadService.getVideoThumbnailFile(path).subscribe(data => {
      this.showLoader = false;
      const activityPath = URL.createObjectURL(data.body);
      this.activitySrc = this.domSanitizer.bypassSecurityTrustUrl(activityPath);
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
