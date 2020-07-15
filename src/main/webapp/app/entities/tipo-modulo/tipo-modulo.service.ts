import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { ITipoModulo } from 'app/shared/model/tipo-modulo.model';

type EntityResponseType = HttpResponse<ITipoModulo>;
type EntityArrayResponseType = HttpResponse<ITipoModulo[]>;

@Injectable({ providedIn: 'root' })
export class TipoModuloService {
  public resourceUrl = SERVER_API_URL + 'api/tipo-modulo';

  constructor(protected http: HttpClient) {}

  create(tipoModulo: ITipoModulo): Observable<EntityResponseType> {
    return this.http.post<ITipoModulo>(this.resourceUrl, tipoModulo, { observe: 'response' });
  }

  update(tipoModulo: ITipoModulo): Observable<EntityResponseType> {
    return this.http.put<ITipoModulo>(this.resourceUrl, tipoModulo, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ITipoModulo>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ITipoModulo[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
