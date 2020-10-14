import { ITema } from './tema.model';
import { IRolColaborador } from './rol-colaborador.model';
import { INumeroGrado } from './numero-grado.model';
// import { SafeUrl } from '@angular/platform-browser';
import { Moment } from 'moment';

export interface IRutaModel {
  id?: number;
  usuario?: any;
  portadaUrl?: string;
  titulo?: string;
  descripcion?: string;
  temas?: ITema[];
  rolesColaboradores?: IRolColaborador[];
  nivelAcademico?: INumeroGrado[];
  nivelRutas?: any[];
  fechaCreacion?: Moment;
  fechaPublicacion?: Moment;
}

export class RutaModel implements IRutaModel {
  constructor(
    public id?: number,
    public usuario?: any,
    public portadaUrl?: string,
    public titulo?: string,
    public descripcion?: string,
    public temas?: ITema[],
    public rolesColaboradores?: IRolColaborador[],
    public nivelAcademico?: INumeroGrado[],
    public nivelRutas?: any[],
    public fechaCreacion?: Moment,
    public fechaPublicacion?: Moment
  ) {}
}
