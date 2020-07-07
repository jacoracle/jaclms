import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { SafeUrl } from '@angular/platform-browser';
import { Contenido } from 'app/shared/model/contenido.model';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  private imgSrc = new Subject<SafeUrl>();
  private editing = new Subject<boolean>();
  private imageProperties = new Subject<Contenido>();

  constructor() {}

  setImgSrc(imgSrc: SafeUrl): void {
    this.imgSrc.next(imgSrc);
  }

  getImgSrc(): Observable<SafeUrl> {
    return this.imgSrc.asObservable();
  }

  setEditing(editing: boolean): void {
    this.editing.next(editing);
  }

  getEditing(): Observable<boolean> {
    return this.editing.asObservable();
  }

  getImageProperties(): Observable<Contenido> {
    return this.imageProperties.asObservable();
  }

  setImageProperties(imageProperties: Contenido): void {
    this.imageProperties.next(imageProperties);
  }
}
