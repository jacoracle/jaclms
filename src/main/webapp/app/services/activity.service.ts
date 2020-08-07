import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { SafeUrl } from '@angular/platform-browser';
import { Contenido } from 'app/shared/model/contenido.model';

@Injectable({
  providedIn: 'root'
})
export class ActivityService {
  private activitySrc = new Subject<SafeUrl>();
  private editing = new Subject<boolean>();
  private activityProperties = new Subject<Contenido>();

  constructor() {}

  setActivitySrc(videoSrc: SafeUrl): void {
    this.activitySrc.next(videoSrc);
  }

  getActivitySrc(): Observable<SafeUrl> {
    return this.activitySrc.asObservable();
  }

  setEditing(editing: boolean): void {
    this.editing.next(editing);
  }

  getEditing(): Observable<boolean> {
    return this.editing.asObservable();
  }

  /**
   * to send values between video component and properties component
   * @param videoProperties object with values of video properties
   */
  setActivityProperties(videoProperties: Contenido): void {
    this.activityProperties.next(videoProperties);
  }
  /**
   * get properties from video file
   */
  getActivityProperties(): Observable<Contenido> {
    return this.activityProperties.asObservable();
  }
}
