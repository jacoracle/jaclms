import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { NavigationControlsService } from 'app/services/navigation-controls.service';
import { Componente } from 'app/shared/model/componente.model';
import { FileUploadService } from 'app/services/file-upload.service';
import { SoundService } from 'app/services/sound.service';

@Component({
  selector: 'jhi-constructor-sound',
  templateUrl: './constructor-sound.component.html',
  styleUrls: ['./constructor-sound.component.scss']
})
export class ConstructorSoundComponent implements OnInit, OnDestroy {
  defaultSoundUrl: SafeUrl = './../../../../content/images/sound-upload.png';
  soundSrc: SafeUrl = '';
  editing = false;
  subscription: Subscription;
  @Input() component?: Componente;
  @Output() updateComponent = new EventEmitter();

  constructor(
    public soundService: SoundService,
    public navigationControlsService: NavigationControlsService,
    public fileUploadService: FileUploadService,
    private domSanitizer: DomSanitizer
  ) {
    this.subscription = this.soundService.getEditing().subscribe(editing => (this.editing = editing));
    this.subscription = this.soundService.getPSoundSrc().subscribe(pdfSrc => {
      if (this.editing) {
        this.soundSrc = pdfSrc;
      }
    });
    this.subscription = this.soundService.getPathUrl().subscribe(pathUrl => {
      if (this.editing) {
        this.updateComponent.emit({ newValue: pathUrl, type: 'image' });
      }
    });
  }

  selectSound(): void {
    this.soundService.setEditing(false);
    this.soundService.setSoundSrc(this.soundSrc);
    this.editing = true;
    this.navigationControlsService.setOpenProperties(true);
  }

  public getSound(path: string): void {
    this.fileUploadService.getPdfPreviewFile(path).subscribe(data => {
      const pdfPath = URL.createObjectURL(data.body);
      this.soundSrc = this.domSanitizer.bypassSecurityTrustResourceUrl(pdfPath);
    });
  }

  ngOnInit(): void {
    if (this.component && this.component.contenido && this.component.contenido.contenido !== '') {
      this.getSound(this.component.contenido.contenido!);
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
