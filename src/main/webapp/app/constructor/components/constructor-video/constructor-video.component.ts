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
    this.subscription = this.videoService.getVideoSrc().subscribe(videoSrc => {
      if (this.editing) {
        this.videoSrc = videoSrc;
      }
    });
    this.subscription = this.videoService.getPathUrl().subscribe(pathUrl => {
      if (this.editing) {
        this.updateComponent.emit({ newValue: pathUrl, type: 'image' });
      }
    });
  }

  selectVideo(): void {
    this.videoService.setEditing(false);
    this.videoService.setVideoSrc(this.videoSrc);
    this.editing = true;
    this.navigationControlsService.setOpenProperties(true);
  }

  public getVideo(path: string): void {
    this.fileUploadService.getVideoPreviewFile(path).subscribe(data => {
      const videoPath = URL.createObjectURL(data.body);
      const objectUrl = this.domSanitizer.bypassSecurityTrustUrl(videoPath);
      this.videoSrc = objectUrl;
    });
  }

  ngOnInit(): void {
    if (this.component && this.component.contenido && this.component.contenido.contenido !== '') {
      this.getVideo(this.component.contenido.contenido!);
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
