import { TipoNivelJerarquico } from './enumerations/tipo-nivel-jerarquico.model';
import { IBloqueComponentes } from './bloque-componentes.model';
import { IBloquesCurso } from './bloques-curso.model';

export interface INivelJerarquico {
  nivelId?: number;
  nombre?: string;
  tipo?: TipoNivelJerarquico;
  informacionAdicional?: 0;
  bloquesCurso?: IBloquesCurso[];
  cursoId?: number;
  moduloId?: number;
  orden?: number;
}

export class NivelJerarquico implements INivelJerarquico {
  public nivelId?: number | undefined;
  public nombre?: string | undefined;
  public tipo?: TipoNivelJerarquico;
  public informacionAdicional?: 0;
  public bloquesCurso?: IBloquesCurso[];
  public cursoId?: number;
  public moduloId?: number;
  public orden?: number;
}
