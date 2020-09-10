import { Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { ImageService } from 'app/services/image.service';
import { JhiEventManager, JhiEventWithContent } from 'ng-jhipster';
import { FileUploadService } from 'app/services/file-upload.service';
import { CurrentCourseService } from 'app/services/current-course.service';
import { SafeUrl } from '@angular/platform-browser';
import { VideoService } from 'app/services/video.service';
import { PdfService } from 'app/services/pdf.service';
import { PdfModalService } from 'app/services/pdf-modal.service';
import { SoundService } from 'app/services/sound.service';
import { VideoModalService } from 'app/services/video-modal.service';
import { Contenido, IContenido } from 'app/shared/model/contenido.model';
import { CurrentModuleService } from 'app/services/current-module.service';
import { ActivityService } from 'app/services/activity.service';
import { ActivityModalService } from 'app/services/activity-modal.service';
import { ActividadInteractiva, ContenidoActividad } from 'app/shared/model/actividad-interactiva.model';
import { cantidadAtributos } from 'app/shared/util/util';
import { IActividadPregunta } from 'app/shared/model/actividad-pregunta.model';

@Component({
  selector: 'jhi-constructor-component-properties',
  templateUrl: './constructor-component-properties.component.html',
  styleUrls: ['./constructor-component-properties.component.scss']
})
export class ConstructorComponentPropertiesComponent implements OnDestroy {
  defaultImageUrl = './../../../content/images/image_thumb.png';
  defaultVideoUrl = './../../../content/images/video_thumb.png';
  defaultPdfUrl = './../../../content/images/pdf_thumb.png';
  loadedPdfUrl = './../../../content/images/pdf_up_thumb.png';
  defaultSoundUrl = './../../../content/images/audio_thumb.png';
  loadedSoundUrl = './../../../content/images/audio_up_thumb.png';
  defaultActivityUrl = './../../../content/images/actividad.png';
  loadedFormActivity = './../../../content/images/activity_up_thumb.png';
  allowedFileTypes: any = ['image/jpg', 'image/png', 'image/jpeg', 'video/mp4', 'application/pdf', 'audio/mpeg'];
  imageFileTypes: any = ['image/jpg', 'image/png', 'image/jpeg'];

  subscription: Subscription;
  imgSrc: SafeUrl = '';
  videoSrc: SafeUrl = '';
  thumbSrc: SafeUrl = '';
  pdfSrc: SafeUrl = '';
  soundSrc: SafeUrl = '';
  activitySrc: SafeUrl = '';
  contenidoProperties: IContenido = {
    contenido: '',
    nombre: '',
    extension: '',
    peso: 0
  };
  maxImageSize = 5120000;
  selectedFiles = [];
  id = 0; // Id de curso o módulo a guardar.
  type = ''; // course, module
  @ViewChild('fileInput', { static: false }) fileInput: any;
  fileFormat = '';
  @ViewChild('sPlayer', { static: false }) soundplayer: ElementRef | undefined;
  showLoader = false;
  listenAudio = false;
  viewPdf = false;
  multimediaFileProperties: Contenido = {
    id: 0,
    nombre: '',
    peso: 0,
    extension: ''
  };

  actividadProperties: ActividadInteractiva = {
    id: 0,
    contenido: undefined
  };
  actividadesInteractivas: ActividadInteractiva[] = [];

  private _GIB24 = 1024000000;
  private _MIL24 = 1024000;
  private _KIL24 = 1024;

  constructor(
    public imageService: ImageService,
    public videoService: VideoService,
    public pdfService: PdfService,
    public soundService: SoundService,
    public activityService: ActivityService,
    public eventManager: JhiEventManager,
    public fileUploadService: FileUploadService,
    public currentCourseService: CurrentCourseService,
    public currentModuleService: CurrentModuleService,
    private pdfModalService: PdfModalService,
    private videoModalService: VideoModalService,
    private activityModalService: ActivityModalService
  ) {
    // Recibe el src de la imagen a mostrar
    this.subscription = this.subscriptionImage();

    // Recibe el src del video (completo) a mostrar
    this.subscription = this.subscriptionVideo();

    // Recibe el src del pdf (completo) a mostrar
    this.subscription = this.subscriptioPdf();

    // Recibe el src del sonido (completo) a mostrar
    this.subscription = this.subscriptionSound();

    // Recibe el src del thumbnail (imagen) del video a mostrar como preview
    this.subscription = this.subscriptionVideoThumb();

    // Formulario de la actividad a mostrar como preview
    this.subscription = this.subscriptionActivity();

    this.type = this.currentCourseService.getType() !== '' ? this.currentCourseService.getType() : this.currentModuleService.getType();
    if (this.type === 'course') {
      this.subscription = this.currentCourseService.getCurrentCourse().subscribe(currentCourse => {
        if (currentCourse.id) {
          this.id = currentCourse.id;
        }
      });
    } else {
      this.type = this.currentModuleService.getType();
      this.subscription = this.currentModuleService.getCurrentModule().subscribe(currentModule => {
        if (currentModule.id) {
          this.id = currentModule.id;
        }
      });
    }

    this.subscription = this.imageService.getImageProperties().subscribe(props => {
      // la propiedad contenido sirve para el path en caso de multimedia y para texto html en caso de componentes de texto
      this.multimediaFileProperties.id = props.id ? props.id : 0;
      this.multimediaFileProperties.nombre = props.nombre ? props.nombre : 'unknown';
      this.multimediaFileProperties.peso = props.peso ? props.peso : 0;
      this.multimediaFileProperties.pesoPrint = this.printSize(this.multimediaFileProperties.peso);
      this.multimediaFileProperties.extension = props.extension ? props.extension : 'unknown';
      this.multimediaFileProperties.contenido = props.contenido ? props.contenido : 'unknown';
      this.listenAudio = false;
    });

    this.subscription = this.videoService.getVideoProperties().subscribe(props => {
      this.multimediaFileProperties.id = props.id ? props.id : 0;
      this.multimediaFileProperties.nombre = props.nombre ? props.nombre : 'unknown';
      this.multimediaFileProperties.peso = props.peso ? props.peso : 0;
      this.multimediaFileProperties.pesoPrint = this.printSize(this.multimediaFileProperties.peso);
      this.multimediaFileProperties.extension = props.extension ? props.extension : 'unknown';
      this.multimediaFileProperties.contenido = props.contenido ? props.contenido : 'unknown';
      this.listenAudio = false;
    });

    this.subscription = this.pdfService.getPdfProperties().subscribe(props => {
      this.multimediaFileProperties.id = props.id ? props.id : 0;
      this.multimediaFileProperties.nombre = props.nombre ? props.nombre : 'unknown';
      this.multimediaFileProperties.peso = props.peso ? props.peso : 0;
      this.multimediaFileProperties.pesoPrint = this.printSize(this.multimediaFileProperties.peso);
      this.multimediaFileProperties.extension = props.extension ? props.extension : 'unknown';
      this.multimediaFileProperties.contenido = props.contenido ? props.contenido : 'unknown';
      this.listenAudio = false;
    });

    this.subscription = this.soundService.getAudioProperties().subscribe(props => {
      this.multimediaFileProperties.id = props.id ? props.id : 0;
      this.multimediaFileProperties.nombre = props.nombre ? props.nombre : 'unknown';
      this.multimediaFileProperties.peso = props.peso ? props.peso : 0;
      this.multimediaFileProperties.pesoPrint = this.printSize(this.multimediaFileProperties.peso);
      this.multimediaFileProperties.extension = props.extension ? props.extension : 'unknown';
      this.multimediaFileProperties.contenido = props.contenido ? props.contenido : 'unknown';
      this.listenAudio = false;
    });

    this.subscription = this.activityService.getActivityProperties().subscribe(props => {
      this.actividadesInteractivas = props;
      const indexActividad = props.length - 1;
      const actividadInteractiva = props[indexActividad];
      if (actividadInteractiva) {
        this.actividadProperties.contenido =
          cantidadAtributos(actividadInteractiva.contenido) > 0 ? actividadInteractiva.contenido : 'unknown';
        this.actividadProperties.id = actividadInteractiva.id ? actividadInteractiva.id : 0;
      }
    });
  }

  printSize(size: number): string {
    let print;
    if (size) {
      if (size < this._GIB24) {
        print = this.convertBytesToKilobytes(size) + ' KB';
      } else {
        print = this.convertBytesToMegabytes(size) + ' MB';
      }
    } else {
      print = '0 Bytes';
    }
    return print;
  }

  convertBytesToMegabytes(byteSize: number): number {
    return parseFloat((byteSize / this._MIL24).toFixed(2));
  }

  convertBytesToKilobytes(byteSize: number): number {
    return parseFloat((byteSize / this._KIL24).toFixed(2));
  }

  subscriptionVideoThumb(): Subscription {
    return this.videoService.getThumbSrc().subscribe(thumbSrc => {
      this.thumbSrc = thumbSrc;
      this.fileFormat = 'video';
      if (this.thumbSrc === '') {
        this.fileInput.nativeElement.value = '';
      }
      this.showLoader = false;
    });
  }

  subscriptionSound(): Subscription {
    return this.soundService.getSoundSrc().subscribe(soundSrc => {
      this.soundSrc = soundSrc;
      this.fileFormat = 'sound';
      if (this.soundSrc === '') {
        this.fileInput.nativeElement.value = '';
      } else {
        if (this.multimediaFileProperties.contenido !== undefined && this.listenAudio) {
          this.showLoader = true;
          setTimeout(() => {
            if (this.soundplayer) {
              this.soundplayer.nativeElement.play();
            }
          }, 200);
          this.showLoader = false;
        }
      }
    });
  }

  subscriptioPdf(): Subscription {
    return this.pdfService.getPdfSrc().subscribe(pdfSrc => {
      this.pdfSrc = pdfSrc;
      this.fileFormat = 'pdf';
      if (this.pdfSrc === '') {
        this.fileInput.nativeElement.value = '';
      } else {
        if (this.multimediaFileProperties.contenido !== undefined && this.viewPdf) {
          this.showLoader = true;
          this.pdfModalService.open(this.pdfSrc);
          this.viewPdf = false;
          this.showLoader = false;
        }
      }
      this.showLoader = false;
    });
  }

  subscriptionVideo(): Subscription {
    return this.videoService.getVideoSrc().subscribe(videoSrc => {
      this.videoSrc = videoSrc;
      this.fileFormat = 'video';
      if (this.videoSrc === '') {
        this.fileInput.nativeElement.value = '';
      } else {
        this.showLoader = true;
        this.videoModalService.open(this.videoSrc);
        this.showLoader = false;
      }
      this.showLoader = false;
    });
  }

  subscriptionActivity(): Subscription {
    return this.activityService.getActivityProperties().subscribe(actividadesInteractivas => {
      this.actividadesInteractivas = actividadesInteractivas;
      this.fileFormat = 'activity';
      if (this.activitySrc === '') {
        // this.fileInput.nativeElement.value = '';
      } else {
        /* this.showLoader = true;
        this.activityModalService.open();
        this.showLoader = false;*/
      }
      this.showLoader = false;
    });
  }

  subscriptionImage(): Subscription {
    return this.imageService.getImgSrc().subscribe(imgSrc => {
      this.imgSrc = imgSrc;
      this.fileFormat = 'image';
      if (this.imgSrc === '') {
        this.fileInput.nativeElement.value = '';
      }
      this.showLoader = false;
    });
  }

  /*
   * Recibe archivo seleccionado, valida tamaño y tipo, y sube el archivo a servidor. Obtiene src necesario para mostrar en componente y en propiedades.
   * @param event  Evento con archivo seleccionado.
   */
  selectFile(event: any): void {
    if (event.target.files.length) {
      // Validar tamaño máximo
      if (event.target.files[0].size > this.maxImageSize) {
        this.showErrorFileSize(event);
        return;
        // Validar tipo de archivo
      } else if (!this.allowedFileTypes.includes(event.target.files[0].type)) {
        this.showErrorFileType(event);
        return;
      } else {
        this.selectedFiles = event.target.files;
        this.showLoader = true;
        this.fileUploadService.pushFileStorage(this.selectedFiles[0], this.id, this.type).subscribe(data => {
          this.validateCalledToService(this.castObjectAsContenido(data), this.fileFormat, event.target.files[0].type, event);
          this.showLoader = false;
        });
      }
    }
  }

  /**
   * Castea el objeto devuelto por servicio cuando se carga un archivo multimedia
   * @param data objeto que contiene las propiedades que seran seteadas a IContenido
   */
  castObjectAsContenido(data: any): IContenido {
    return {
      contenido: data.path,
      extension: data.extension,
      nombre: data.nombre,
      peso: data.peso
    };
  }

  validateCalledToService(obj: IContenido, fileFormat: string, fileType: string, event: any): void {
    if (fileFormat === 'image' && this.imageFileTypes.includes(fileType)) {
      this.fileUploadService.getImage(obj.contenido!);
      this.imageService.setImageProperties(obj);
    } else if (fileFormat === 'video' && fileType === 'video/mp4') {
      this.fileUploadService.getVideoThumbnail(obj.contenido!);
      this.videoService.setVideoProperties(obj);
    } else if (fileFormat === 'pdf' && fileType === 'application/pdf') {
      this.pdfService.setPdfProperties(obj);
    } else if (fileFormat === 'sound' && fileType === 'audio/mpeg') {
      this.soundService.setAudioProperties(obj);
    } else {
      this.showErrorFileType(event);
    }
  }

  delete(): void {
    this.fileUploadService.deleteFile(this.multimediaFileProperties.contenido!).subscribe(() => {
      if (this.fileFormat === 'image') {
        this.setImageUrl('');
        this.fileInput.nativeElement.value = '';
      } else if (this.fileFormat === 'video') {
        this.setVideoUrl('');
        this.fileInput.nativeElement.value = '';
      } else if (this.fileFormat === 'pdf') {
        this.setPdfUrl('');
        this.fileInput.nativeElement.value = '';
      } else if (this.fileFormat === 'sound') {
        this.setSoundUrl('');
        this.fileInput.nativeElement.value = '';
      } else if (this.fileFormat === 'activity') {
        this.deleteActivity();
      } else {
        this.showErrorFileType('');
        return;
      }
    });
  }

  setSoundUrl(soundPath: string): void {
    this.soundService.setSoundSrc(soundPath);
    this.soundService.setAudioProperties(this.contenidoProperties);
  }

  setPdfUrl(pdfPath: string): void {
    this.pdfService.setPdfSrc(pdfPath);
    this.pdfService.setPdfProperties(this.contenidoProperties);
  }

  setVideoUrl(videoPath: string): void {
    this.videoService.setThumbSrc(videoPath);
    this.videoService.setVideoSrc(videoPath);
    this.videoService.setVideoProperties(this.contenidoProperties);
  }

  setImageUrl(imagePath: string): void {
    this.imageService.setImgSrc(imagePath);
    this.imageService.setImageProperties(this.contenidoProperties);
  }

  showErrorFileSize(event: any): void {
    this.eventManager.broadcast(
      new JhiEventWithContent('constructorApp.validationError', { message: 'constructorApp.curso.validations.fileSize' })
    );
    if (event.target.files) {
      event.target.files = new DataTransfer().files;
    }
  }

  showErrorFileType(event: any): void {
    this.eventManager.broadcast(
      new JhiEventWithContent('constructorApp.validationError', { message: 'constructorApp.curso.validations.fileType' })
    );
    if (event.target.files) {
      event.target.files = new DataTransfer().files;
    }
  }

  pdfPreview(): void {
    if (this.multimediaFileProperties.contenido != null) {
      this.fileUploadService.getPdf(this.multimediaFileProperties.contenido);
      this.viewPdf = true;
    }
  }

  createUpdateActivity(): void {
    if (this.fileFormat === 'activity') {
      const indexActividad = this.actividadesInteractivas.length - 1;
      const actividadInteractiva = this.actividadesInteractivas[indexActividad];
      const jsonFormIn = this.jsonFormEntrada(actividadInteractiva);

      this.activityModalService.open(jsonFormIn).result.then((jsonFormOut: IActividadPregunta) => {
        if (jsonFormOut) {
          this.actividadesInteractivas[indexActividad] = this.jsonFormSalida(jsonFormOut, actividadInteractiva);
          this.activityService.setActivityProperties(this.actividadesInteractivas);
        }
        this.showLoader = false;
      });
    }
  }

  jsonFormEntrada(actividadInteractiva: ActividadInteractiva): IActividadPregunta | undefined {
    let jsonFormIn: IActividadPregunta | undefined;
    if (cantidadAtributos(actividadInteractiva.contenido) > 0) {
      jsonFormIn = actividadInteractiva.contenido as IActividadPregunta;
      if (typeof actividadInteractiva.evaluable === 'boolean') {
        jsonFormIn.evaluable = actividadInteractiva.evaluable;
      }
      if (actividadInteractiva.tipoActividadInteractiva) {
        jsonFormIn.tipoActividad = actividadInteractiva.tipoActividadInteractiva;
        if (
          actividadInteractiva.tipoActividadInteractiva.opcion === 'unica' &&
          actividadInteractiva.tipoActividadInteractiva.subtipo === 'verdaderoFalso'
        ) {
          jsonFormIn.tipoActividad.subtipo = 'texto';
          jsonFormIn.tipoActividad.opcion = 'verdaderoFalso';
        }
      }
    }
    return jsonFormIn;
  }

  jsonFormSalida(jsonFormOut: IActividadPregunta, actividadInteractiva: ActividadInteractiva): ActividadInteractiva {
    this.showLoader = true;
    if (actividadInteractiva && jsonFormOut && cantidadAtributos(jsonFormOut) > 0) {
      if (jsonFormOut.tipoActividad.opcion === 'verdaderoFalso') {
        jsonFormOut.tipoActividad.opcion = 'unica';
        jsonFormOut.tipoActividad.subtipo = 'verdaderoFalso';
      }
      actividadInteractiva.tipoActividadInteractiva = jsonFormOut.tipoActividad;
      actividadInteractiva.evaluable = jsonFormOut.evaluable;
      if (cantidadAtributos(actividadInteractiva.tipoActividadInteractiva) > 0) {
        delete jsonFormOut.tipoActividad;
        delete jsonFormOut.evaluable;
        actividadInteractiva.contenido = new ContenidoActividad();
        Object.assign(actividadInteractiva.contenido, jsonFormOut);
      }
    }
    return actividadInteractiva;
  }

  deleteActivity(): void {
    this.showLoader = true;
    const indexActividad = this.actividadesInteractivas.length - 1;
    const actividadInteractiva = this.actividadesInteractivas[indexActividad];
    actividadInteractiva.contenido = new ContenidoActividad();
    actividadInteractiva.evaluable = false;
    this.actividadesInteractivas[indexActividad] = actividadInteractiva;
    this.activityService.setActivityProperties(this.actividadesInteractivas);
    this.showLoader = false;
  }

  loadSound(): void {
    if (this.multimediaFileProperties.contenido != null) {
      this.fileUploadService.getSound(this.multimediaFileProperties.contenido);
      this.listenAudio = true;
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  loadVideo(): void {
    if (this.multimediaFileProperties.contenido != null) {
      this.fileUploadService.getVideo(this.multimediaFileProperties.contenido);
    }
  }
}
