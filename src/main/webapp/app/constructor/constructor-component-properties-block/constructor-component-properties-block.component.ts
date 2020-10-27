import { Component, OnInit, OnDestroy } from '@angular/core';
import { BloquesCursoService } from 'app/entities/bloques_curso/bloques_curso.service';
import { ContentBlocksService } from 'app/services/content-blocks.service';
import { IBloquesCurso } from 'app/shared/model/bloques-curso.model';
import { Componente } from 'app/shared/model/componente.model';
import { Subject, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { BloquesCurso } from 'app/shared/model/bloques-curso.model';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'jhi-constructor-component-properties-block',
  templateUrl: './constructor-component-properties-block.component.html',
  styleUrls: ['./constructor-component-properties-block.component.scss']
})
export class ConstructorComponentPropertiesBlockComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  private ngUnsubscribe = new Subject();
  name = '';
  isChecked = false;
  dataBlock: IBloquesCurso = new BloquesCurso();
  nameSelectedBlock = '';
  componentes: Componente[] = [];

  constructor(
    private contentBlocksService: ContentBlocksService,
    private bloquesService: BloquesCursoService,
    public translate: TranslateService
  ) {
    // .b-title-text .final-block-row div pedo con alineado de título en header, este funciona en título normal

    this.subscription = this.contentBlocksService
      .getSelectedBlockId()
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(id => {
        // console.error('SelectedBlockId: ', id);
        this.getDataSelectedBlock(id).then(data => {
          if (data) {
            this.dataBlock = data;
            this.nameSelectedBlock = this.dataBlock.bloqueComponentes!.tipoBloqueComponentes!.nombre || '';
            this.componentes = this.dataBlock.bloqueComponentes!.componentes || [];
          }
        });
      });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
      this.ngUnsubscribe.next();
      this.ngUnsubscribe.complete();
    }
  }

  ngOnInit(): void {
    // console.error('##### DATA: ', this.dataBlock);
  }

  getDataSelectedBlock = async (blockId: number): Promise<IBloquesCurso | undefined> => {
    // const data = await this.bloquesService.find(blockId).toPromise();
    return (await this.bloquesService.find(blockId).toPromise()).body as IBloquesCurso;
    // return data.body as IBloquesCurso;
  };

  updateBlockVisibilty(): void {
    // console.error('Cambio toogle, ahora es visible para: ', !this.dataBlock.visible ? 'Alumno' : 'Profesor');
    this.updateBlock();
  }

  updateBlock(): void {
    this.subscription = this.bloquesService
      .update([this.dataBlock])
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(res => {
        console.error('Visibilidad de bloque actualizada: response: ', res);
      });
  }
}
