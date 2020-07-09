import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { IBloquesCurso } from 'app/shared/model/bloques-curso.model';

type EntityResponseType = HttpResponse<IBloquesCurso[]>;

@Injectable({ providedIn: 'root' })
export class BloquesCursoService {
  public resourceUrl = SERVER_API_URL + 'api/bloques-curso';

  constructor(protected http: HttpClient) {}

  update(bloquesCurso: IBloquesCurso[]): Observable<EntityResponseType> {
    return this.http.put<IBloquesCurso[]>(this.resourceUrl, bloquesCurso, { observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
