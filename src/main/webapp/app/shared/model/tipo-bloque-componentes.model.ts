import { IBloqueComponentes } from 'app/shared/model/bloque-componentes.model';

export interface ITipoBloqueComponentes {
  id?: number;
  nombre?: string;
  bloqueComponentes?: IBloqueComponentes[];
  iconPath?: string;
  tags?: string;
}

export class TipoBloqueComponentes implements ITipoBloqueComponentes {
  constructor(
    public id?: number,
    public nombre?: string,
    public bloqueComponentes?: IBloqueComponentes[],
    public iconPath?: string,
    public tags?: string
  ) {}
}
