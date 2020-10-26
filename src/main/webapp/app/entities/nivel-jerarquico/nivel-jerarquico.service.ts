import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { INivelJerarquico } from 'app/shared/model/nivel-jerarquico.model';
import { INivel, Nivel } from 'app/shared/model/nivel.model';
import { HierarchicalLevel, SubNivelRutas } from 'app/shared/model/interface/hierarchical-level.model';
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

  dataChange = new BehaviorSubject<HierarchicalLevel[]>([]);

  constructor(protected http: HttpClient) {}

  get data(): HierarchicalLevel[] {
    return this.dataChange.value;
  }

  insertItem(parent: HierarchicalLevel, name: string): void {
    if (parent.nivelJerarquico) {
      parent.nivelJerarquico.push({ id: undefined, nombre: name, nivelJerarquico: [], imagenUrl: '' } as HierarchicalLevel);
      this.dataChange.next(this.data);
    }
  }

  updateItem(node: HierarchicalLevel, name: string): void {
    node.nombre = name;
    this.dataChange.next(this.data);
  }

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
