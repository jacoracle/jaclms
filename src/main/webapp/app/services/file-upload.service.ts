import { Injectable } from '@angular/core';
import { SERVER_API_URL } from 'app/app.constants';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { ImageService } from './image.service';
import { VideoService } from './video.service';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {
  constructor(
    private http: HttpClient,
    private domSanitizer: DomSanitizer,
    private imageService: ImageService,
    private videoService: VideoService
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
    data.append('id', 'Curso-' + id.toString());
    return this.http.post(SERVER_API_URL + '/api/fileUpload', data);
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

  /*
   * Obtiene video del servidor.
   * @param filePath  Dirección donde está almacenado el video.
   * @returns         Video en formato blob.
   */
  getVideoFile(filePath: string): Observable<HttpResponse<Blob>> {
    return this.http.get(SERVER_API_URL + '/api/loadVideo?file=' + filePath, {
      observe: 'response',
      responseType: 'blob'
    });
  }

  /*
   * Obtiene thumbnail (imagen) de video del servidor.
   * @param filePath  Dirección donde está almacenado el video.
   * @returns         Imagen en formato blob.
   */
  getVideoThumbnailFile(filePath: string): Observable<HttpResponse<Blob>> {
    return this.http.get(SERVER_API_URL + '/api/videoFrame?file=' + filePath, {
      observe: 'response',
      responseType: 'blob'
    });
  }

  /*
   * Elimina archivo indicado del servidor.
   * @param filePath  Dirección donde está almacenado el archivo.
   * @returns         Response.
   */
  deleteFile(filePath: string): Observable<any> {
    const data: FormData = new FormData();
    data.append('file', filePath);
    return this.http.delete(SERVER_API_URL + '/api/file?file=' + filePath, { responseType: 'text' });
  }

  /*
   * Solicita imagen del servidor, crea un objectUrl con ella y asigna el src a imageService.
   * @param filePath  Dirección donde está almacenada la imagen.
   */
  public getImage(path: string): void {
    this.getImageFile(path).subscribe(data => {
      const imagePath = URL.createObjectURL(data.body);
      const objectUrl = this.domSanitizer.bypassSecurityTrustUrl(imagePath);
      this.imageService.setImgSrc(objectUrl);
    });
  }

  /*
   * Solicita thumbnail de video (imagen) del servidor, crea un objectUrl con ella y asigna el src a videoervice.
   * @param filePath  Dirección donde está almacenada la imagen.
   */
  public getVideo(path: string): void {
    this.getVideoFile(path).subscribe(data => {
      const videoPath = URL.createObjectURL(data.body);
      const objectUrl = this.domSanitizer.bypassSecurityTrustUrl(videoPath);
      this.videoService.setVideoSrc(objectUrl);
    });
  }

  /*
   * Solicita thumbnail de video (imagen) del servidor, crea un objectUrl con ella y asigna el src a videoervice.
   * @param filePath  Dirección donde está almacenada la imagen.
   */
  public getVideoThumbnail(path: string): void {
    this.getVideoThumbnailFile(path).subscribe(data => {
      const videoPath = URL.createObjectURL(data.body);
      const objectUrl = this.domSanitizer.bypassSecurityTrustUrl(videoPath);
      this.videoService.setThumbSrc(objectUrl);
    });
  }
}
