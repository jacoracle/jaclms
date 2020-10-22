import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { INivelJerarquico } from 'app/shared/model/nivel-jerarquico.model';
import { INivel, Nivel } from 'app/shared/model/nivel.model';
import { SubNivelRutas } from 'app/shared/model/interface/hierarchical-level.model';
// import { map } from 'rxjs/operators';

type EntityResponseType = HttpResponse<INivelJerarquico>;
type EntityResponseTypeNivel = HttpResponse<INivel>;
type EntityResponseTypeHierachical = HttpResponse<SubNivelRutas>;

@Injectable({ providedIn: 'root' })
export class NivelJerarquicoService {
  public resourceUrlCourse = SERVER_API_URL + 'api/curso/nivel-modulo';
  public resourceUrlModule = SERVER_API_URL + 'api/modulo/nivel-modulo';
  public resourceNivelesUrl = 'http://localhost:8081/api/niveles';
  public resourceEstructuraJerarquica = SERVER_API_URL + 'api/estructura-jerarquica';

  constructor(protected http: HttpClient) {}

  queryPreview(id: string): Observable<EntityResponseTypeNivel> {
    return this.http.get<Nivel>(`${this.resourceNivelesUrl}/${id}`, { observe: 'response' });
  }

  query(id: string): Observable<EntityResponseTypeHierachical> {
    return this.http.get<SubNivelRutas>(`${this.resourceEstructuraJerarquica}/${id}`, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseTypeHierachical> {
    return this.http.get<SubNivelRutas>(`${this.resourceEstructuraJerarquica}/${id}`, { observe: 'response' });
    // this.http.get<SubNivelRutas>(`${this.resourceEstructuraJerarquica}/${id}`, { observe: 'response' })
    // .pipe(map((res: EntityResponseTypeHierachical) => this.convertDateFromServer(res)));
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
