export interface IActividadInteractiva {
  id?: number;
  contenido?: ContenidoActividad;
  evaluable?: boolean | null;
  intentos?: number | null;
  gamificacion?: number | null;
}

export class ActividadInteractiva implements IActividadInteractiva {
  constructor(
    public id?: number,
    public contenido?: ContenidoActividad,
    public evaluable?: boolean | null,
    public intentos?: number | null,
    public gamificacion?: number | null
  ) {}
}

export class ContenidoActividad {}
