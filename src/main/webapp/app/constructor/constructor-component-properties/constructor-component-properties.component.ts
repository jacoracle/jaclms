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
import { Contenido } from 'app/shared/model/contenido.model';

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
  pathUrl = '';
  maxImageSize = 5120000;
  selectedFiles = [];
  id = 0; // Id de curso o módulo a guardar.
  type = 'course'; // course, module
  @ViewChild('fileInput', { static: false }) fileInput: any;
  fileFormat = '';
  @ViewChild('sPlayer', { static: false }) soundplayer: ElementRef | undefined;
  showLoader = false;
  listenAudio = false;
  multimediaFileProperties: Contenido = {
    nombre: '',
    peso: 0,
    extension: ''
  };

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

    // Recibe el pathUrl de la imagen seleccionada.
    this.imageService.getPathUrl().subscribe(pathUrl => {
      this.pathUrl = pathUrl;
      this.fileFormat = 'image';
      this.listenAudio = false;
    });
    // Recibe el pathUrl del video seleccionado.
    this.videoService.getPathUrl().subscribe(pathUrl => {
      this.pathUrl = pathUrl;
      this.fileFormat = 'video';
      this.listenAudio = false;
    });

    this.pdfService.getPathUrl().subscribe(pathUrl => {
      this.pathUrl = pathUrl;
      this.fileFormat = 'pdf';
      this.listenAudio = false;
    });

    this.soundService.getPathUrl().subscribe(pathUrl => {
      this.pathUrl = pathUrl;
      this.fileFormat = 'sound';
      this.listenAudio = false;
    });

    if (this.type === 'course') {
      this.subscription = this.currentCourseService.getCurrentCourse().subscribe(currentCourse => {
        if (currentCourse.id) {
          this.id = currentCourse.id;
        }
      });
    }

    this.subscription = this.imageService.getImageProperties().subscribe(props => {
      // this.imageFileProperties = props;
      // console.error(this.imageFileProperties);
      // la propiedad contenido sirve para el path en caso de multimedia y para texto html en caso de componentes de texto
      console.error('########### Props seteadas desde componente de imagen: ->');
      console.error(props);
      this.multimediaFileProperties.nombre = props.nombre ? props.nombre : 'unknown';
      this.multimediaFileProperties.peso = props.peso ? props.peso : 0;
      this.multimediaFileProperties.extension = props.extension ? props.extension : 'unknown';
      this.multimediaFileProperties.contenido = props.contenido ? props.contenido : 'unknown';
    });

    this.subscription = this.videoService.getVideoProperties().subscribe(props => {
      console.error('########### Props seteadas desde componente de video: ->');
      console.error(props);
      this.multimediaFileProperties.nombre = props.nombre ? props.nombre : 'unknown';
      this.multimediaFileProperties.peso = props.peso ? props.peso : 0;
      this.multimediaFileProperties.extension = props.extension ? props.extension : 'unknown';
      this.multimediaFileProperties.contenido = props.contenido ? props.contenido : 'unknown';
    });

    this.subscription = this.pdfService.getPdfProperties().subscribe(props => {
      console.error('########### Props seteadas desde componente de pdf: ->');
      console.error(props);
      this.multimediaFileProperties.nombre = props.nombre ? props.nombre : 'unknown';
      this.multimediaFileProperties.peso = props.peso ? props.peso : 0;
      this.multimediaFileProperties.extension = props.extension ? props.extension : 'unknown';
      this.multimediaFileProperties.contenido = props.contenido ? props.contenido : 'unknown';
    });

    this.subscription = this.soundService.getSoundProperties().subscribe(props => {
      console.error('########### Props seteadas desde componente de pdf: ->');
      console.error(props);
      this.multimediaFileProperties.nombre = props.nombre ? props.nombre : 'unknown';
      this.multimediaFileProperties.peso = props.peso ? props.peso : 0;
      this.multimediaFileProperties.extension = props.extension ? props.extension : 'unknown';
      this.multimediaFileProperties.contenido = props.contenido ? props.contenido : 'unknown';
    });
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
      }
      setTimeout(() => {
        if (this.soundplayer) {
          this.soundplayer.nativeElement.play();
        }
      }, 200);
      this.showLoader = false;
    });
  }

  subscriptioPdf(): Subscription {
    return this.pdfService.getPdfSrc().subscribe(pdfSrc => {
      this.pdfSrc = pdfSrc;
      this.fileFormat = 'pdf';
      if (this.pdfSrc === '') {
        this.fileInput.nativeElement.value = '';
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
          if (this.fileFormat === 'image' && this.imageFileTypes.includes(event.target.files[0].type)) {
            this.getImageUrl(data.path);
          } else if (this.fileFormat === 'video' && event.target.files[0].type === 'video/mp4') {
            this.getVideoUrl(data.path);
          } else if (this.fileFormat === 'pdf' && event.target.files[0].type === 'application/pdf') {
            this.getPdfUrl(data.path);
          } else if (this.fileFormat === 'sound' && event.target.files[0].type === 'audio/mpeg') {
            this.getSoundUrl(data.path);
          } else {
            this.showErrorFileType(event);
            return;
          }
          this.showLoader = false;
        });
      }
    }
  }

  getSoundUrl(soundPath: string): void {
    this.fileUploadService.getSound(soundPath);
    this.soundService.setPathUrl(soundPath);
  }

  getPdfUrl(pdfPath: string): void {
    this.fileUploadService.getPdf(pdfPath);
    this.pdfService.setPathUrl(pdfPath);
  }

  getVideoUrl(videoPath: string): void {
    this.fileUploadService.getVideoThumbnail(videoPath);
    this.fileUploadService.getVideo(videoPath);
    this.videoService.setPathUrl(videoPath);
  }

  getImageUrl(imagePath: string): void {
    this.fileUploadService.getImage(imagePath);
    this.imageService.setPathUrl(imagePath);
  }

  delete(): void {
    this.fileUploadService.deleteFile(this.pathUrl).subscribe(() => {
      if (this.fileFormat === 'image') {
        this.setImageUrl('');
      } else if (this.fileFormat === 'video') {
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
    this.soundService.setPathUrl(soundPath);
  }

  setPdfUrl(pdfPath: string): void {
    this.pdfService.setPdfSrc(pdfPath);
    this.pdfService.setPathUrl(pdfPath);
  }

  setVideoUrl(imagePath: string): void {
    this.videoService.setThumbSrc(imagePath);
    this.videoService.setVideoSrc(imagePath);
    this.videoService.setPathUrl(imagePath);
  }

  setImageUrl(imagePath: string): void {
    this.imageService.setImgSrc('');
    this.imageService.setPathUrl(imagePath);
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
    this.showLoader = true;
    this.pdfModalService.open(this.pdfSrc);
    this.showLoader = false;
  }

  loadSound(): void {
    this.showLoader = true;
    this.listenAudio = true;
    this.fileUploadService.getSound(this.pathUrl);
    this.showLoader = false;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  loadVideo(): void {
    this.showLoader = true;
    this.videoModalService.open(this.videoSrc);
    this.showLoader = false;
  }
}
