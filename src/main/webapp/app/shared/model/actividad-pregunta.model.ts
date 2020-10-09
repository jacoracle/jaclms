import { TipoActividad } from 'app/shared/model/actividad-interactiva.model';
import { SafeUrl } from '@angular/platform-browser';

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
  public path?: string;
  public tipoRecurso?: string;
  public safeUrl?: SafeUrl;
  public loadedVideo?: boolean;
}

export class Respuestas {
  public respuesta?: string;
  public correcta?: boolean;
  public seleccionada?: boolean;
  public path?: string;
  public safeUrl?: SafeUrl;
}
