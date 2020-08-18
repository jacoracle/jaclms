export interface IActividadPregunta {
  tipoActividad: TipoActividad;
  preguntas: Preguntas[];
}

export class ActividadPregunta implements IActividadPregunta {
  constructor(public tipoActividad: TipoActividad, public preguntas: Preguntas[]) {}
}

export class TipoActividad {
  public tipoActividad?: string;
  public subtipo?: number;
  public opcion?: string;
}

export class Preguntas {
  public pregunta?: string;
  public tipoPregunta?: string;
  public respuestas?: Respuestas[];
  public calificada?: boolean;
  public marcada?: boolean;
  public correcta?: boolean;
}

export class Respuestas {
  public respuesta?: string;
  public correcta?: boolean;
  public seleccionada?: boolean;
}
