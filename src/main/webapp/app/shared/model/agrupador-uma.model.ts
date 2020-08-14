import { IAgrupador } from './agrupador.model';
import { IModulo } from './modulo.model';

export interface IAgrupadorUma {
  id?: number;
  agrupador?: IAgrupador;
  modulo?: IModulo; //  este es una uma, pero por cambio del cliente ya creado se quedo como modulo
  orden?: number;
}

export class AgrupadorUma implements IAgrupadorUma {
  constructor(public titulo?: string, public agrupador?: IAgrupador, public modulo?: IModulo, public orden?: number) {}
}
