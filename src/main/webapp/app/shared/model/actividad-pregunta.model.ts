import { TipoActividad } from 'app/shared/model/actividad-interactiva.model';

export interface IActividadPregunta {
  tipoActividad: TipoActividad;
  preguntas: Preguntas[];
  evaluable: boolean;
}

export class ActividadPregunta implements IActividadPregunta {
  constructor(public tipoActividad: TipoActividad, public preguntas: Preguntas[], public evaluable: boolean) {}
}

export class Preguntas {
  public pregunta?: string;
  public tipoPregunta?: string;
  public respuestas?: Respuestas[];
  public calificada?: boolean;
  public marcada?: boolean;
  public correcta?: boolean;
  public tipoRespuestas?: string;
}

export class Respuestas {
  public respuesta?: string;
  public correcta?: boolean;
  public seleccionada?: boolean;
  public path?: string;
  public safeUrl?: string;
}
