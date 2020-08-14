import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IAgrupadorUma } from 'app/shared/model/agrupador-uma.model';

type EntityResponseType = HttpResponse<IAgrupadorUma>;
type EntityArrayResponseType = HttpResponse<IAgrupadorUma[]>;

@Injectable({ providedIn: 'root' })
export class AgrupadorUmaService {
  public resourceUrl = SERVER_API_URL + 'api/agrupador-modulo';

  constructor(protected http: HttpClient) {}

  create(umaGroup: any): Observable<EntityResponseType> {
    return this.http.post<IAgrupadorUma>(this.resourceUrl, umaGroup, { observe: 'response' });
    //   .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(umaGroup: any): Observable<EntityResponseType> {
    // const copy = this.convertDateFromClient(umaGroup);
    return this.http.put<IAgrupadorUma>(this.resourceUrl, umaGroup, { observe: 'response' });
    //   .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IAgrupadorUma>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    //   .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IAgrupadorUma[]>(this.resourceUrl, { params: options, observe: 'response' });
    //   .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
