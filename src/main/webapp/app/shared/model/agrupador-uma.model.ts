import { ITagAgrupador } from './tag-agrupador.model';
import { Moment } from 'moment';

export interface IAgrupador {
  titulo?: string;
  descripcion?: string;
  etiquetas?: ITagAgrupador[];
  id?: number;
  fechaFin?: string; //    verificar el tipo y si se queda o se quita
  fechaFinSys?: Moment;
  fechaInicio?: string; //    verificar el tipo y si se queda o se quita
  fechaInicioSys?: Moment;
  modulos?: any[]; //    este sera de tipo AgrupadorModulo
}

export class Agrupador implements IAgrupador {
  constructor(
    public titulo?: string,
    public descripcion?: string,
    public etiquetas?: ITagAgrupador[],
    public id?: number,
    public fechaFin?: string,
    public fechaFinSys?: Moment,
    public fechaInicio?: string,
    public fechaInicioSys?: Moment,
    public modulos?: any[]
  ) {}
}
