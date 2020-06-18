import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IPais } from 'app/shared/model/pais.model';
import { HttpResponse, HttpClient } from '@angular/common/http';
import { createRequestOption } from 'app/shared/util/request-util';
import { SERVER_API_URL } from 'app/app.constants';

type EntityArrayResponseType = HttpResponse<IPais[]>;

@Injectable({
  providedIn: 'root'
})
export class CountryService {
  public resourceUrl = SERVER_API_URL + 'api/pais';

  constructor(protected http: HttpClient) {}

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IPais[]>(this.resourceUrl, { params: options, observe: 'response' });
  }
}
