import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { INivelJerarquico } from 'app/shared/model/nivel-jerarquico.model';

type EntityResponseType = HttpResponse<INivelJerarquico>;

@Injectable({ providedIn: 'root' })
export class NivelJerarquicoService {
  public resourceUrl = SERVER_API_URL + 'api/curso/nivel-jerarquico';

  constructor(protected http: HttpClient) {}

  create(nivelJerarquico: INivelJerarquico): Observable<EntityResponseType> {
    return this.http.post<INivelJerarquico>(this.resourceUrl, nivelJerarquico, { observe: 'response' });
  }

  update(nivelJerarquico: INivelJerarquico): Observable<EntityResponseType> {
    return this.http.put<INivelJerarquico>(this.resourceUrl, nivelJerarquico, { observe: 'response' });
  }
}
