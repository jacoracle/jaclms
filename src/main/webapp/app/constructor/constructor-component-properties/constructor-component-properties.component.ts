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
  allowedFileTypes: any = ['image/jpg', 'image/png', 'image/jpeg', 'video/mp4', 'application/pdf', 'audio/mpeg'];
  imageFileTypes: any = ['image/jpg', 'image/png', 'image/jpeg'];

  subscription: Subscription;
  imgSrc: SafeUrl = '';
  videoSrc: SafeUrl = '';
  thumbSrc: SafeUrl = '';
  pdfSrc: SafeUrl = '';
  soundSrc: SafeUrl = '';
  contenidoProperties: IContenido = {
    contenido: '',
    nombre: '',
    extension: '',
    peso: 0
  };
  maxImageSize = 5120000;
  selectedFiles = [];
  id = 0; // Id de curso o módulo a guardar.
  type = 'course'; // course, module
  @ViewChild('fileInput', { static: false }) fileInput: any;
  fileFormat = '';
  @ViewChild('sPlayer', { static: false }) soundplayer: ElementRef | undefined;
  showLoader = false;
  listenAudio = false;
  viewPdf = false;
  multimediaFileProperties: Contenido = {
    nombre: '',
    peso: 0,
    extension: ''
  };
  private _MIL24 = 1024000;

  constructor(
    public imageService: ImageService,
    public videoService: VideoService,
    public pdfService: PdfService,
    public soundService: SoundService,
    public eventManager: JhiEventManager,
    public fileUploadService: FileUploadService,
    public currentCourseService: CurrentCourseService,
    private pdfModalService: PdfModalService,
    private videoModalService: VideoModalService
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

    if (this.type === 'course') {
      this.subscription = this.currentCourseService.getCurrentCourse().subscribe(currentCourse => {
        if (currentCourse.id) {
          this.id = currentCourse.id;
        }
      });
    }

    this.subscription = this.imageService.getImageProperties().subscribe(props => {
      // la propiedad contenido sirve para el path en caso de multimedia y para texto html en caso de componentes de texto
      this.multimediaFileProperties.nombre = props.nombre ? props.nombre : 'unknown';
      this.multimediaFileProperties.peso = props.peso ? this.convertBytesToMegabytes(props.peso) : 0;
      this.multimediaFileProperties.pesoMB = props.peso ? this.multimediaFileProperties.peso + ' MB' : '0 MB';
      this.multimediaFileProperties.extension = props.extension ? props.extension : 'unknown';
      this.multimediaFileProperties.contenido = props.contenido ? props.contenido : 'unknown';
      this.listenAudio = false;
    });

    this.subscription = this.videoService.getVideoProperties().subscribe(props => {
      this.multimediaFileProperties.nombre = props.nombre ? props.nombre : 'unknown';
      this.multimediaFileProperties.peso = props.peso ? this.convertBytesToMegabytes(props.peso) : 0;
      this.multimediaFileProperties.pesoMB = props.peso ? this.multimediaFileProperties.peso + ' MB' : '0 MB';
      this.multimediaFileProperties.extension = props.extension ? props.extension : 'unknown';
      this.multimediaFileProperties.contenido = props.contenido ? props.contenido : 'unknown';
      this.listenAudio = false;
    });

    this.subscription = this.pdfService.getPdfProperties().subscribe(props => {
      this.multimediaFileProperties.nombre = props.nombre ? props.nombre : 'unknown';
      this.multimediaFileProperties.peso = props.peso ? this.convertBytesToMegabytes(props.peso) : 0;
      this.multimediaFileProperties.pesoMB = props.peso ? this.multimediaFileProperties.peso + ' MB' : '0 MB';
      this.multimediaFileProperties.extension = props.extension ? props.extension : 'unknown';
      this.multimediaFileProperties.contenido = props.contenido ? props.contenido : 'unknown';
      this.listenAudio = false;
    });

    this.subscription = this.soundService.getAudioProperties().subscribe(props => {
      this.multimediaFileProperties.nombre = props.nombre ? props.nombre : 'unknown';
      this.multimediaFileProperties.peso = props.peso ? this.convertBytesToMegabytes(props.peso) : 0;
      this.multimediaFileProperties.pesoMB = props.peso ? this.multimediaFileProperties.peso + ' MB' : '0 MB';
      this.multimediaFileProperties.extension = props.extension ? props.extension : 'unknown';
      this.multimediaFileProperties.contenido = props.contenido ? props.contenido : 'unknown';
      this.listenAudio = false;
    });
  }

  convertBytesToMegabytes(byteSize: number): number {
    return parseFloat((byteSize / this._MIL24).toFixed(2));
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
        this.fileUploadService.pushFileStorage(this.selectedFiles[0], this.id).subscribe(data => {
          this.getDataMultimediaFile(this.castObjectAsContenido(data), this.fileFormat, event.target.files[0].type, event);
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

  getDataMultimediaFile(data: IContenido, fileFormat: string, fileType: string, event: any): void {
    this.validateCalledToService(fileFormat, data, fileType, event);
  }

  validateCalledToService(fileFormat: string, obj: IContenido, fileType: string, event: any): void {
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
      if (this.fileFormat === 'video') {
        this.setVideoUrl('');
      } else if (this.fileFormat === 'pdf') {
        this.setPdfUrl('');
      } else if (this.fileFormat === 'sound') {
        this.setSoundUrl('');
      } else {
        this.showErrorFileType('');
        return;
      }
      this.fileInput.nativeElement.value = '';
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
    event.target.files = [];
  }

  showErrorFileType(event: any): void {
    this.eventManager.broadcast(
      new JhiEventWithContent('constructorApp.validationError', { message: 'constructorApp.curso.validations.fileType' })
    );
    event.target.files = [];
  }

  pdfPreview(): void {
    if (this.multimediaFileProperties.contenido != null) {
      this.fileUploadService.getPdf(this.multimediaFileProperties.contenido);
      this.viewPdf = true;
    }
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
