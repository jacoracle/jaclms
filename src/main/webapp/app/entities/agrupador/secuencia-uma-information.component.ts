import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IAgrupador } from 'app/shared/model/agrupador.model';

@Component({
  selector: 'jhi-secuencia-uma-information',
  templateUrl: './secuencia-uma-information.component.html',
  styleUrls: ['./secuencia-uma-information.component.scss']
})
export class SecuenciaUmaInformationComponent {
  @Input()
  agrupadorObj!: IAgrupador | null;

  @Output()
  step = new EventEmitter();

  constructor() {}

  editarAgrupador(): void {
    this.step.emit(1);
  }
}
