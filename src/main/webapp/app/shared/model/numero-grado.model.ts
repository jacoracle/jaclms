import { ICurso } from 'app/shared/model/curso.model';
import { IGradoAcademico } from 'app/shared/model/grado-academico.model';

export interface INumeroGrado {
  id?: number;
  nombre?: string;
  orden?: number;
  descripcion?: string;
  cursos?: ICurso[];
  gradoAcademico?: IGradoAcademico;
}

export class NumeroGrado implements INumeroGrado {
  constructor(
    public id?: number,
    public nombre?: string,
    public orden?: number,
    public descripcion?: string,
    public cursos?: ICurso[],
    public gradoAcademico?: IGradoAcademico
  ) {}
}
