import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { SafeUrl } from '@angular/platform-browser';
import { Contenido } from 'app/shared/model/contenido.model';

@Injectable({
  providedIn: 'root'
})
export class VideoService {
  private videoSrc = new Subject<SafeUrl>();
  private editing = new Subject<boolean>();
  private pathUrl = new Subject<string>();
  private thumbSrc = new Subject<SafeUrl>();
  private videoProperties = new Subject<Contenido>();

  constructor() {}

  setVideoSrc(videoSrc: SafeUrl): void {
    this.videoSrc.next(videoSrc);
  }

  getVideoSrc(): Observable<SafeUrl> {
    return this.videoSrc.asObservable();
  }

  setEditing(editing: boolean): void {
    this.editing.next(editing);
  }

  getEditing(): Observable<boolean> {
    return this.editing.asObservable();
  }

  setPathUrl(pathUrl: string): void {
    this.pathUrl.next(pathUrl);
  }

  getPathUrl(): Observable<string> {
    return this.pathUrl.asObservable();
  }

  setThumbSrc(thumbSrc: SafeUrl): void {
    this.thumbSrc.next(thumbSrc);
  }

  getThumbSrc(): Observable<SafeUrl> {
    return this.thumbSrc.asObservable();
  }

  /**
   * to send values between video component and properties component
   * @param videoProperties object with values of video properties
   */
  setVideoProperties(videoProperties: Contenido): void {
    this.videoProperties.next(videoProperties);
  }
  /**
   * get properties from video file
   */
  getVideoProperties(): Observable<Contenido> {
    return this.videoProperties.asObservable();
  }
}
