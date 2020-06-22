import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { ImageService } from 'app/services/image.service';
import { JhiEventManager, JhiEventWithContent } from 'ng-jhipster';
import { FileUploadService } from 'app/services/file-upload.service';
import { CurrentCourseService } from 'app/services/current-course.service';
import { SafeUrl } from '@angular/platform-browser';
import { VideoService } from 'app/services/video.service';

@Component({
  selector: 'jhi-constructor-component-properties',
  templateUrl: './constructor-component-properties.component.html',
  styleUrls: ['./constructor-component-properties.component.scss']
})
export class ConstructorComponentPropertiesComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  imgSrc: SafeUrl = '';
  defaultImageUrl = './../../../content/images/cover_upload.png';
  videoSrc: SafeUrl = '';
  defaultVideoUrl = './../../../content/images/cover_upload.png';
  thumbSrc: SafeUrl = '';
  videoPathUrl = '';
  maxImageSize = 5000000;
  allowedFileTypes: any = ['image/jpg', 'image/png', 'image/jpeg', 'video/mp4'];
  selectedFiles = [];
  id = 0; // Id de curso o módulo a guardar.
  type = 'course'; // course, module
  @ViewChild('fileInput', { static: false }) fileInput: any;
  fileFormat = '';
  @ViewChild('vPlayer', { static: false }) videoplayer: ElementRef | undefined;

  constructor(
    public imageService: ImageService,
    public videoService: VideoService,
    public eventManager: JhiEventManager,
    public fileUploadService: FileUploadService,
    public currentCourseService: CurrentCourseService
  ) {
    // Recibe el src de la imagen a mostrar
    this.subscription = this.imageService.getImgSrc().subscribe(imgSrc => {
      this.imgSrc = imgSrc;
      this.fileFormat = 'image';
      if (this.imgSrc === '') {
        this.fileInput.nativeElement.value = '';
      }
    });
    // Recibe el src del video (completo) a mostrar
    this.subscription = this.videoService.getVideoSrc().subscribe(videoSrc => {
      this.videoSrc = videoSrc;
      this.fileFormat = 'video';
      if (this.videoSrc === '') {
        this.fileInput.nativeElement.value = '';
      } else {
        setTimeout(() => this.videoplayer!.nativeElement.play(), 1000);
      }
    });
    // Recibe el src del thumbnail (imagen) del video a mostrar como preview
    this.subscription = this.videoService.getThumbSrc().subscribe(thumbSrc => {
      this.thumbSrc = thumbSrc;
      this.fileFormat = 'video';
      if (this.thumbSrc === '') {
        this.fileInput.nativeElement.value = '';
      }
      this.videoSrc = '';
    });
    // Recibe el pathUrl del componente seleccionado
    this.subscription = this.videoService.getPathUrl().subscribe(pathUrl => {
      this.videoPathUrl = pathUrl;
      this.fileFormat = 'video';
    });

    if (this.type === 'course') {
      this.subscription = this.currentCourseService.getCurrentCourse().subscribe(currentCourse => {
        if (currentCourse.id) {
          this.id = currentCourse.id;
        }
      });
    }
  }

  /*
   * Recibe archivo seleccionado, valida tamaño y tipo, y sube el archivo a servidor. Obtiene src necesario para mostrar en componente y en propiedades.
   * @param event  Evento con archivo seleccionado.
   */
  selectFile(event: any): void {
    if (event.target.files.length) {
      // Validar tamaño máximo
      if (event.target.files[0].size > this.maxImageSize) {
        this.eventManager.broadcast(
          new JhiEventWithContent('constructorApp.validationError', { message: 'constructorApp.curso.validations.fileSize' })
        );
        event.target.files = [];
        return;
        // Validar tipo de archivo
      } else if (!this.allowedFileTypes.includes(event.target.files[0].type)) {
        this.eventManager.broadcast(
          new JhiEventWithContent('constructorApp.validationError', { message: 'constructorApp.curso.validations.fileType' })
        );
        event.target.files = [];
        return;
      } else {
        this.selectedFiles = event.target.files;
        this.fileUploadService.pushFileStorage(this.selectedFiles[0], this.id).subscribe(data => {
          switch (this.fileFormat) {
            case 'image': {
              this.fileUploadService.getImage(data.path);
              this.imageService.setPathUrl(data.path);
              break;
            }
            case 'video': {
              this.fileUploadService.getVideoThumbnail(data.path);
              this.videoService.setPathUrl(data.path);
              break;
            }
          }
        });
      }
    }
  }

  deleteImage(): void {
    this.imageService.setImgSrc('');
    this.imageService.setPathUrl('');
    this.fileInput.nativeElement.value = '';
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  loadVideo(): void {
    this.fileUploadService.getVideo(this.videoPathUrl);
  }
}
