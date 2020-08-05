/*
 * Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
 *
 *
 */

import { TipoNivelJerarquico } from './enumerations/tipo-nivel-jerarquico.model';
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
