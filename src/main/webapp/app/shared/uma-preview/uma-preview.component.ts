import { AfterViewInit, Component, OnInit } from '@angular/core'; // , ElementRef, ViewChild
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SafeUrl, DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { ImageService } from 'app/services/image.service';

@Component({
  selector: 'jhi-uma-preview-modal',
  templateUrl: './uma-preview.component.html',
  styleUrls: ['./uma-preview.component.scss']
})
export class UmaPreviewModalComponent implements OnInit, AfterViewInit {
  umaData: any;
  bloquesUma: any;
  componentesUma: any;
  imgSrc: SafeUrl = '';
  subscription: Subscription;

  constructor(public activeModal: NgbActiveModal, private imageService: ImageService, private domSanitizer: DomSanitizer) {
    // console.error('####   Datos recibidos del UMA: ');
    this.subscription = this.imageService.getImgSrc().subscribe(imgSrc => {
      this.imgSrc = imgSrc;
    });
  }

  ngOnInit(): void {
    this.bloquesUma = this.umaData.nivelesModulo!.nivelJerarquico!.bloquesCurso;
    // this.componentesUma = this.bloquesUma.bloqueComponentes
  }

  ngAfterViewInit(): void {}

  setImgSrc(imgPath: string): void {
    // console.error(imgPath);
    this.imageService.setImgSrc(imgPath);
    // return this.imgSrc;
  }

  transform(pathImg: string): SafeResourceUrl {
    return this.domSanitizer.bypassSecurityTrustResourceUrl(pathImg);
  }
}
