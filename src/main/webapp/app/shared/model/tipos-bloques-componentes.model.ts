import { ITipoComponente } from './tipo-componente.model';

export interface ITiposBloquesComponentes {
  orden?: number;
  tipoComponente?: ITipoComponente;
}

export class TiposBloquesComponentes implements ITiposBloquesComponentes {
  constructor(public orden?: number, public tipoComponente?: ITipoComponente) {}
}
