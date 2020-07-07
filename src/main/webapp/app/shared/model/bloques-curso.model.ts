import { IBloqueComponentes } from './bloque-componentes.model';
import { INivelJerarquico } from './nivel-jerarquico.model';

export interface IBloquesCurso {
  id?: number;
  bloqueComponentes?: IBloqueComponentes;
  orden?: number;
  mostrar?: number;
  indicadorOriginal?: number;
  nivelJerarquico?: INivelJerarquico;
}

export class BloquesCurso implements IBloquesCurso {
  constructor(
    public id?: number,
    public bloqueComponentes?: IBloqueComponentes,
    public orden?: number,
    public mostrar?: number,
    public indicadorOriginal?: number,
    public nivelJerarquico?: INivelJerarquico
  ) {}
}
