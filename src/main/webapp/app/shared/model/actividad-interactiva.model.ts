export interface IActividadInteractiva {
  id?: number;
  contenido?: ContenidoActividad;
  evaluable?: boolean | null;
  intentos?: number | null;
  gamificacion?: number | null;
  tipoActividadInteractiva?: TipoActividad;
}

export class ActividadInteractiva implements IActividadInteractiva {
  constructor(
    public id?: number,
    public contenido?: ContenidoActividad,
    public evaluable?: boolean | null,
    public intentos?: number | null,
    public gamificacion?: number | null,
    public tipoActividadInteractiva?: TipoActividad
  ) {}
}

export class ContenidoActividad {}

export class TipoActividad {
  public tipoActividad?: string;
  public subtipo?: number;
  public opcion?: string;
}
