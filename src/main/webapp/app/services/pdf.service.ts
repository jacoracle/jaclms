import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { SafeUrl } from '@angular/platform-browser';
import { Contenido } from 'app/shared/model/contenido.model';

@Injectable({
  providedIn: 'root'
})
export class PdfService {
  private pdfSrc = new Subject<SafeUrl>();
  private editing = new Subject<boolean>();
  // private pathUrl = new Subject<string>();
  private pdfProperties = new Subject<Contenido>();

  constructor() {}

  setPdfSrc(dfSrc: SafeUrl): void {
    this.pdfSrc.next(dfSrc);
  }

  getPdfSrc(): Observable<SafeUrl> {
    return this.pdfSrc.asObservable();
  }

  setEditing(editing: boolean): void {
    this.editing.next(editing);
  }

  getEditing(): Observable<boolean> {
    return this.editing.asObservable();
  }
  /*
  setPathUrl(pathUrl: string): void {
    this.pathUrl.next(pathUrl);
  }

  getPathUrl(): Observable<string> {
    return this.pathUrl.asObservable();
  }
  */

  setPdfProperties(pdfProperties: Contenido): void {
    this.pdfProperties.next(pdfProperties);
  }

  getPdfProperties(): Observable<Contenido> {
    return this.pdfProperties.asObservable();
  }
}
