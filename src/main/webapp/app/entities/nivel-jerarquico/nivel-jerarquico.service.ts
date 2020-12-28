import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { SERVER_API_URL } from 'app/app.constants';
import { INivelJerarquico } from 'app/shared/model/nivel-jerarquico.model';
import { INivel, Nivel } from 'app/shared/model/nivel.model';
import { HierarchicalLevel, HierarchicalStructure } from 'app/shared/model/interface/hierarchical-level.model';
// import { map } from 'rxjs/operators';

type EntityResponseType = HttpResponse<INivelJerarquico>;
type EntityResponseTypeNivel = HttpResponse<INivel>;
type EntityResponseTypeHierachical = HttpResponse<HierarchicalStructure>;

@Injectable({ providedIn: 'root' })
export class NivelJerarquicoService {
  public resourceUrlCourse = SERVER_API_URL + 'api/curso/nivel-modulo';
  public resourceUrlModule = SERVER_API_URL + 'api/modulo/nivel-modulo';
  public resourceNivelesUrl = 'http://localhost:8081/api/niveles';
  public resourceEstructuraJerarquica = SERVER_API_URL + 'api/estructura-jerarquica';
  public resourceHierarchicalLevel = SERVER_API_URL + 'api/nivel-jerarquico';
  public resourceHierarchicalLevelGroup = SERVER_API_URL + 'api/nivel-agrupador';

  dataChange = new BehaviorSubject<HierarchicalLevel[]>([]);

  constructor(protected http: HttpClient) {}

  get data(): HierarchicalLevel[] {
    return this.dataChange.value;
  }

  createLevel(level: HierarchicalLevel): Observable<EntityResponseType> {
    const url = this.resourceHierarchicalLevel;
    return this.http.post<HierarchicalLevel>(url, level, { observe: 'response' });
  }

  createSubLevel(sublevel: HierarchicalLevel): Observable<EntityResponseType> {
    const url = this.resourceHierarchicalLevel;
    return this.http.post<HierarchicalLevel>(url, sublevel, { observe: 'response' });
  }

  updateNode(nivelJerarquico: HierarchicalLevel): Observable<EntityResponseType> {
    const url = this.resourceHierarchicalLevel;
    return this.http.put<HierarchicalLevel>(url, nivelJerarquico, { observe: 'response' });
  }

  insertItem(parent: HierarchicalLevel, name: string): void {
    if (parent.nivelJerarquico) {
      parent.nivelJerarquico.push({ id: undefined, nombre: name, nivelJerarquico: [], imagenUrl: '' } as HierarchicalLevel);
    } else {
      this.data.push({ id: undefined, nombre: name } as HierarchicalLevel);
    }
    this.dataChange.next(this.data);
  }

  updateItem(node: HierarchicalLevel, name: string): void {
    node.nombre = name;
    this.dataChange.next(this.data);
  }

  queryPreview(id: string): Observable<EntityResponseTypeNivel> {
    return this.http.get<Nivel>(`${this.resourceNivelesUrl}/${id}`, { observe: 'response' });
  }

  query(id: string): Observable<EntityResponseTypeHierachical> {
    return this.http.get<HierarchicalStructure>(`${this.resourceEstructuraJerarquica}/${id}`, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseTypeHierachical> {
    // return this.http.get<SubNivelRutas>(`${this.resourceEstructuraJerarquica}/${id}`, { observe: 'response' });
    return this.http.get<HierarchicalStructure>(`${this.resourceHierarchicalLevel}/${id}`, { observe: 'response' });

    // this.http.get<SubNivelRutas>(`${this.resourceEstructuraJerarquica}/${id}`, { observe: 'response' })
    // .pipe(map((res: EntityResponseTypeHierachical) => this.convertDateFromServer(res)));
  }

  findLevel(id: number): Observable<EntityResponseTypeHierachical> {
    return this.http.get<any>(`${this.resourceHierarchicalLevel}/${id}`, { observe: 'response' });
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

  deleteGroup(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceHierarchicalLevelGroup}/${id}`, { observe: 'response' });
  }
}
