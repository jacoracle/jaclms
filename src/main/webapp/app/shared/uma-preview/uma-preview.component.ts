import { AfterViewInit, Component, OnInit } from '@angular/core'; // , ElementRef, ViewChild
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SafeUrl } from '@angular/platform-browser';
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
  //   @ViewChild('vPlayer', { static: false }) videoplayer: ElementRef | undefined;
  imgSrc: SafeUrl = '';
  subscription: Subscription;

  constructor(public activeModal: NgbActiveModal, private imageService: ImageService) {
    console.error('####   Datos recibidos del UMA: ');
    console.error(this.umaData);

    this.subscription = this.imageService.getImgSrc().subscribe(imgSrc => {
      this.imgSrc = imgSrc;
    });
  }

  ngOnInit(): void {
    this.bloquesUma = this.umaData.nivelesModulo!.nivelJerarquico!.bloquesCurso;
    // this.componentesUma = this.bloquesUma.bloqueComponentes
  }

  ngAfterViewInit(): void {
    // setTimeout(() => {
    //   if (this.videoplayer) {
    //     this.videoplayer.nativeElement.play();
    //   }
    // }, 1000);
  }

  setImgSrc(imgPath: string): void {
    console.error(imgPath);
    this.imageService.setImgSrc(imgPath);
    // return this.imgSrc;
  }
}
