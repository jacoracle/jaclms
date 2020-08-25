import { AfterViewInit, Component, OnInit } from '@angular/core'; // , ElementRef, ViewChild
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

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

  constructor(public activeModal: NgbActiveModal) {
    console.error('####   Datos recibidos del UMA: ');
    console.error(this.umaData);
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
}
