import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { SafeUrl } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { Componente } from 'app/shared/model/componente.model';
import { NavigationControlsService } from 'app/services/navigation-controls.service';
import { JhiEventManager, JhiEventWithContent } from 'ng-jhipster';
import { ActivityService } from 'app/services/activity.service';
import { cantidadAtributos } from 'app/shared/util/util';
import { ActividadInteractiva, ContenidoActividad, IActividadInteractiva } from 'app/shared/model/actividad-interactiva.model';
import { ContenidoActividadService } from 'app/entities/contenido/contenido-actividad.service';

@Component({
  selector: 'jhi-constructor-activity',
  templateUrl: './constructor-activity.component.html',
  styleUrls: ['./constructor-activity.component.scss']
})
export class ConstructorActivityComponent implements OnInit, OnDestroy {
  defaultQuestionsTextUrl: SafeUrl = './../../../../content/images/actividad.png';
  loadedQuestionsTextUrl: SafeUrl = './../../../../content/images/actividad_up.png';
  defaultQuestionsMediaUrl: SafeUrl = './../../../../content/images/ab11.png';
  loadedQuestionsMediaUrl: SafeUrl = './../../../../content/images/ab11_up.png';
  defaultQuestionsAudioTextUrl: SafeUrl = './../../../../content/images/ab15.png';
  loadedQuestionsAudioTextUrl: SafeUrl = './../../../../content/images/ab15_up.png';
  defaultQuestionsAudioMediaUrl: SafeUrl = './../../../../content/images/ab16.png';
  loadedQuestionsAudioMediaUrl: SafeUrl = './../../../../content/images/ab16_up.png';
  contenidoActividad?: ContenidoActividad;
  editing = false;
  subscription: Subscription;
  @Input() component?: Componente;
  @Input() typeQuestion = '';
  @Output() updateComponent = new EventEmitter();
  showLoader = false;

  constructor(
    public activityService: ActivityService,
    private contenidoActividadService: ContenidoActividadService,
    private eventManager: JhiEventManager,
    public navigationControlsService: NavigationControlsService
  ) {
    this.subscription = this.activityService.getEditing().subscribe(editing => (this.editing = editing));

    this.subscription = this.activityService.getEditing().subscribe((editing: boolean) => {
      if (this.editing) {
        this.editing = editing;
      }
    });

    this.subscription = this.activityService.getActivityProperties().subscribe((objProperties: IActividadInteractiva[]) => {
      if (this.component!.actividadesInteractivas) {
        const indexActividad = this.component!.actividadesInteractivas.length - 1;
        if (indexActividad !== undefined) {
          if (this.editing && this.component!.actividadesInteractivas[indexActividad].id) {
            this.updateComponent.emit(objProperties);
            // Actualizar contenido de componente en base de datos
            const contenidoActividad = this.createUpdatedActividad(
              this.component!.actividadesInteractivas[indexActividad],
              objProperties[indexActividad]
            );
            this.subscription = this.contenidoActividadService.update(contenidoActividad).subscribe(
              data => {
                this.component!.actividadesInteractivas![indexActividad] = data.body!;
                this.contenidoActividad = this.component!.actividadesInteractivas![indexActividad].contenido;
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
        gamificacion: newContent.gamificacion,
        tipoActividadInteractiva: newContent.tipoActividadInteractiva
      };
    } else {
      return content;
    }
  }

  selectActivity(): void {
    this.activityService.setEditing(false);
    // this.activityService.setActivitySrc(this.activitySrc);
    this.activityService.setTypeQuestion(this.typeQuestion);
    this.activityService.setActivityProperties(this.component!.actividadesInteractivas!);
    this.editing = true;
    this.navigationControlsService.setOpenProperties(true);
  }

  /*
    public getActivity(path: string): void {
      this.showLoader = true;
      this.fileUploadService.getVideoThumbnailFile(path).subscribe(data => {
        this.showLoader = false;
        const activityPath = URL.createObjectURL(data.body);
        this.activitySrc = this.domSanitizer.bypassSecurityTrustUrl(activityPath);
      });
    }*/

  ngOnInit(): void {
    if (this.component && this.component.actividadesInteractivas) {
      const indexActividad = this.component.actividadesInteractivas.length - 1;
      if (indexActividad !== undefined) {
        this.contenidoActividad = this.component.actividadesInteractivas[indexActividad].contenido;
      }
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  cantidadAtributos(obj: any): number {
    return cantidadAtributos(obj);
  }
}
