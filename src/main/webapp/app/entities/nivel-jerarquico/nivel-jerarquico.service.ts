import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { INivelJerarquico } from 'app/shared/model/nivel-jerarquico.model';
import { INivel, Nivel } from 'app/shared/model/nivel.model';

type EntityResponseType = HttpResponse<INivelJerarquico>;
type EntityResponseTypeNivel = HttpResponse<INivel>;

@Injectable({ providedIn: 'root' })
export class NivelJerarquicoService {
  public resourceUrlCourse = SERVER_API_URL + 'api/curso/nivel-jerarquico';
  public resourceUrlModule = SERVER_API_URL + 'api/modulo/nivel-jerarquico';
  public resourceNivelesUrl = 'http://localhost:8081/api/niveles';

  constructor(protected http: HttpClient) {}

  query(id: string): Observable<EntityResponseTypeNivel> {
    return this.http.get<Nivel>(`${this.resourceNivelesUrl}/${id}`, { observe: 'response' });
  }

  create(nivelJerarquico: INivelJerarquico, type: string | undefined): Observable<EntityResponseType> {
    let url;
    if (type && type === 'course') {
      url = this.resourceUrlCourse;
    } else {
      url = this.resourceUrlModule;
    }
    return this.http.post<INivelJerarquico>(url, nivelJerarquico, { observe: 'response' });
  }

  update(nivelJerarquico: INivelJerarquico, type: string | undefined): Observable<EntityResponseType> {
    let url;
    if (type && type === 'course') {
      url = this.resourceUrlCourse;
    } else {
      url = this.resourceUrlModule;
    }
    return this.http.post<INivelJerarquico>(url, nivelJerarquico, { observe: 'response' });
  }
}
