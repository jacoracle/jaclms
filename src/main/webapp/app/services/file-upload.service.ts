import { Injectable } from '@angular/core';
import { SERVER_API_URL } from 'app/app.constants';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {
  constructor(private http: HttpClient, private domSanitizer: DomSanitizer) {}

  pushFileStorage(file: File): Observable<any> {
    const data: FormData = new FormData();
    data.append('file', file);
    return this.http.post(SERVER_API_URL + '/api/fileUpload', data);
  }

  getFile(videoPath: string): Observable<HttpResponse<Blob>> {
    return this.http.get(SERVER_API_URL + '/api/loadVideo?file=' + videoPath, {
      observe: 'response',
      responseType: 'blob'
    });
  }
}