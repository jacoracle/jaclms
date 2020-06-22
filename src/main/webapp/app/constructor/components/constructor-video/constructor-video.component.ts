import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { SafeUrl, DomSanitizer } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { VideoService } from 'app/services/video.service';
import { Componente } from 'app/shared/model/componente.model';
import { NavigationControlsService } from 'app/services/navigation-controls.service';
import { FileUploadService } from 'app/services/file-upload.service';

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

  constructor(
    public videoService: VideoService,
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
  }

  selectVideo(): void {
    this.videoService.setEditing(false);
    this.videoService.setThumbSrc(this.thumbSrc);
    this.videoService.setPathUrl(this.pathUrl);
    this.editing = true;
    this.navigationControlsService.setOpenProperties(true);
  }

  public getVideo(path: string): void {
    this.fileUploadService.getVideoThumbnailFile(path).subscribe(data => {
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
