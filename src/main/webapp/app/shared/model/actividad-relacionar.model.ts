import { TipoActividad } from 'app/shared/model/actividad-interactiva.model';
import { SafeUrl } from '@angular/platform-browser';

export interface IActividadRelacionar {
  tipoActividad: TipoActividad;
  evaluable: boolean;
}

export class ActividadRelacionar implements IActividadRelacionar {
  constructor(public tipoActividad: TipoActividad, public columnas: Columna[], public evaluable: boolean) {}
}

export class Ejercicio {
  public indicacion?: string;
  public columnas?: Columna[];
  public calificada?: boolean;
  public marcada?: boolean;
  public path?: string;
  public tipoRespuestas?: string;
  public tipoRecurso?: string;
  public safeUrl?: SafeUrl;
  public loadedVideo?: boolean;
}

export class Columna {
  public tipoElementos?: string;
  public elementos?: Elemento[];
}

export class Elemento {
  public texto?: string;
  public indice?: number;
  public relacionada?: boolean;
  public path?: string;
  public safeUrl?: SafeUrl;
}
