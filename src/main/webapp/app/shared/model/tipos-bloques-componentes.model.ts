import { ITipoComponente } from './tipo-componente.model';

export interface ITiposBloqueComponentes {
  orden?: number;
  tipoComponente?: ITipoComponente;
}

export class TiposBloqueComponentes implements ITiposBloqueComponentes {
  constructor(public orden?: number, public tipoComponente?: ITipoComponente) {}
}
