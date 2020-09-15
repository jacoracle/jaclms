import { Injectable } from '@angular/core';
import { SERVER_API_URL } from 'app/app.constants';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { VideoService } from './video.service';
import { PdfService } from 'app/services/pdf.service';
import { SoundService } from 'app/services/sound.service';
import { ActivityService } from 'app/services/activity.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FileUploadInteractivasService {
  constructor(
    private http: HttpClient,
    private domSanitizer: DomSanitizer,
    private activityService: ActivityService,
    private videoService: VideoService,
    private pdfService: PdfService,
    private soundService: SoundService
  ) {}

  /*
   * Sube archivo a servidor.
   * @param file  Archivo seleccionado para guardar en file system.
   * @param id    Id del curso al que se va a ligar la imagen.
   * @returns     Objeto con el path donde se guardó el archivo.
   */
  pushFileStorage(file: File, id: number): Observable<any> {
    const data: FormData = new FormData();
    data.append('file', file);
    data.append('id', 'Modulo-' + id.toString());
    return this.http.post(SERVER_API_URL + '/api/fileUploadInteractivas', data);
  }

  /*
   * Obtiene imagen del servidor.
   * @param filePath  Dirección donde está almacenada la imagen.
   * @returns         Imagen en formato blob.
   */
  getImageFile(filePath: string): Observable<HttpResponse<Blob>> {
    return this.http.get(SERVER_API_URL + '/api/loadImage?file=' + filePath, {
      observe: 'response',
      responseType: 'blob'
    });
  }

  getSoundFile(filePath: string): Observable<HttpResponse<Blob>> {
    return this.http.get(SERVER_API_URL + '/api/loadAudio?file=' + filePath, {
      observe: 'response',
      responseType: 'blob'
    });
  }

  /*
   * Elimina archivo indicado del servidor.
   * @param filePath  Dirección donde está almacenado el archivo.
   * @returns         Response.
   */
  deleteFiles(files: string[]): Observable<any> {
    return this.http.delete(SERVER_API_URL + '/api/fileInteractivas?file=' + files.join(', '), { responseType: 'text' });
  }

  /*
   * Solicita imagen del servidor, crea un objectUrl con ella y asigna el src a imageService.
   * @param filePath  Dirección donde está almacenada la imagen.
   */
  public getImage(path: string): Observable<string> {
    return this.getImageFile(path).pipe(
      map(data => {
        return URL.createObjectURL(data.body);
      })
    );
  }

  public getSound(path: string): void {
    this.getSoundFile(path).subscribe(data => {
      const soundPath = URL.createObjectURL(data.body);
      const objectUrl = this.domSanitizer.bypassSecurityTrustUrl(soundPath);
      this.soundService.setSoundSrc(objectUrl);
    });
  }
}
