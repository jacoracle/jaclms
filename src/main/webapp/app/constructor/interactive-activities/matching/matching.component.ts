import { Component, Input, ViewChild } from '@angular/core';
import { Ejercicio, Columna, Elemento } from './../../../shared/model/actividad-relacionar.model';
import { ActivityService } from 'app/services/activity.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ContenidoActividadService } from 'app/entities/contenido/contenido-actividad.service';
import { FileUploadInteractivasService } from 'app/services/file-upload-interactivas.service';
import { JhiEventManager, JhiEventWithContent, JhiAlert } from 'ng-jhipster';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { FileUploadService } from 'app/services/file-upload.service';
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import MicRecorder from 'mic-recorder-to-mp3';
import { ActividadInteractiva } from 'app/shared/model/actividad-interactiva.model';

@Component({
  selector: 'jhi-matching',
  templateUrl: './matching.component.html',
  styleUrls: ['./matching.component.scss']
})
export class MatchingComponent {
  _activity?: ActividadInteractiva;
  @Input()
  set activity(activity: ActividadInteractiva) {
    this._activity = activity;
    this.updateResources();
  }
  get activity(): ActividadInteractiva {
    return this._activity!;
  }
  elementTypes = ['Texto', 'Imagen', 'Audio'];
  resourceTypes = ['Imagen', 'Audio', 'Video'];
  showLoader = false;
  maxImageSize = 5120000;
  allowedAudioTypes: any = ['audio/mpeg'];
  allowedImageTypes: any = ['image/jpg', 'image/png', 'image/jpeg'];
  allowedVideoTypes: any = ['video/mp4'];
  selectedFiles = [];
  @Input() id?: number;
  @ViewChild('resourceInput', { static: false }) fileInput: any;
  alerts: JhiAlert[] = [];
  isOn = false;
  recorder = new MicRecorder({
    bitRate: 128
  });
  recordingExerciseIndex = -1;
  recordingColumnIndex = -1;
  recordingElementIndex = -1;
  maxAudioDuration = 150000; // Miliseconds

  color = 'primary';
  mode = 'determinate';
  value = 0;
  bufferValue = 100;
  recordedTime = 0;
  timeToShow = '0:00';

  constructor(
    private activitiService: ActivityService,
    public activeModal: NgbActiveModal,
    private contenidoActividadService: ContenidoActividadService,
    private fileUploadInteractivasService: FileUploadInteractivasService,
    public eventManager: JhiEventManager,
    private domSanitizer: DomSanitizer,
    private fileUploadService: FileUploadService
  ) {}

  emptyColumn(column: Columna): void {
    if (column && column.elementos) {
      for (let i = 0; i < column.elementos.length; i++) {
        if (column.elementos[i].path && column.elementos[i].path !== '') {
          this.removeFromServer(column.elementos[i].path!);
        }
      }
      column.elementos = [];
    }
  }

  changeElementsType(column: Columna, columnIndex: number, exercise: Ejercicio): void {
    let elementsRequired = 0;
    if (columnIndex === 0 && exercise && exercise.columnas && exercise && exercise.columnas[1].elementos) {
      elementsRequired = exercise.columnas[1].elementos.length;
    }
    if (columnIndex === 1 && exercise && exercise.columnas && exercise && exercise.columnas[0].elementos) {
      elementsRequired = exercise.columnas[0].elementos.length;
    }
    this.emptyColumn(column);
    for (let i = 0; i < elementsRequired; i++) {
      this.addElement(column);
    }
  }

  changeResourceType(exercise: Ejercicio): void {
    if (exercise && exercise.path && exercise.path !== '') {
      this.deleteResource(exercise);
    }
  }

  createExercise(): Ejercicio {
    return {
      ...new Ejercicio(),
      indicacion: '',
      columnas: [this.createColumn(), this.createColumn()],
      calificada: false,
      marcada: false,
      path: '',
      tipoRespuestas: 'Texto',
      tipoRecurso: '',
      safeUrl: '',
      loadedVideo: false
    };
  }

  createColumn(): Columna {
    const element = this.createElement();
    const elements = [];
    elements.push(element);
    return {
      ...new Columna(),
      tipoElementos: 'Texto',
      elementos: elements
    };
  }

  createElement(): Elemento {
    return {
      ...new Elemento(),
      texto: '',
      indice: -1,
      relacionada: false,
      path: '',
      safeUrl: ''
    };
  }

  save(): void {
    this.showLoader = true;
    if (this._activity) {
      this.contenidoActividadService.update(this._activity).subscribe(
        res => this.onSaveSuccess(res.body),
        () => this.onSaveError()
      );
    }
  }

  onSaveSuccess(actividad: ActividadInteractiva | null): void {
    if (actividad) {
      if (this.isActivityDifferent(this._activity!, actividad)) {
        this._activity = actividad;
        this.updateResources();
      }
      this.activitiService.setActivity(this.activity);
      this.showLoader = false;
      this.eventManager.broadcast({
        name: 'constructorApp.validationError',
        content: {
          message: 'constructorApp.curso.nivelJerarquico.created',
          type: 'success'
        }
      });
    }
  }

  onSaveError(): void {
    this.showLoader = false;
  }

  close(): any {
    this.activeModal.close();
  }

  addExercise(): void {
    if (this._activity && this._activity.contenido) {
      if (!this._activity.contenido.ejercicios) {
        this._activity.contenido.ejercicios = [];
      }
      const exercise = this.createExercise();
      this._activity.contenido.ejercicios.push(exercise);
    }
    this.save();
  }

  addRow(exercise: Ejercicio): void {
    if (exercise && exercise.columnas) {
      for (let i = 0; i < exercise.columnas.length; i++) {
        if (exercise.columnas[i] && exercise.columnas[i].elementos) {
          exercise.columnas[i].elementos!.push(this.createElement());
        }
      }
      this.save();
    }
  }

  addElement(column: Columna): void {
    if (column && column.elementos) {
      column.elementos.push(this.createElement());
    }
  }

  deleteResource(exercise: Ejercicio): void {
    if (exercise.path) {
      this.removeFromServer(exercise.path);
      exercise.path = '';
      exercise.safeUrl = '';
      exercise.loadedVideo = false;
      this.selectedFiles = [];
      if (this.fileInput && this.fileInput.nativeElement && this.fileInput.nativeElement.value) {
        this.fileInput.nativeElement.value = '';
      }
      this.save();
    }
  }

  removeFromServer(path: string): void {
    this.fileUploadService.deleteFile(path).subscribe(() => {});
  }

  selectFile(event: any, objeto: any, tipoRecurso: string): void {
    let allowedFileType = true;
    if (event.target.files.length) {
      switch (tipoRecurso) {
        case 'Audio': {
          if (!this.allowedAudioTypes.includes(event.target.files[0].type)) {
            allowedFileType = false;
          }
          break;
        }
        case 'Imagen': {
          if (!this.allowedImageTypes.includes(event.target.files[0].type)) {
            allowedFileType = false;
          }
          break;
        }
        case 'Video': {
          if (!this.allowedVideoTypes.includes(event.target.files[0].type)) {
            allowedFileType = false;
          }
          break;
        }
      }
      if (!allowedFileType) {
        this.showErrorFileType(event);
        return;
      } else if (event.target.files[0].size > this.maxImageSize) {
        this.showErrorFileSize(event);
        return;
      } else {
        this.selectedFiles = event.target.files;
        this.showLoader = true;
        if (event.target.files[0] && this.id) {
          this.fileUploadInteractivasService.pushFileStorage(event.target.files[0], this.id).subscribe(data => {
            this.removeFromServer(objeto.path);
            objeto.path = data.path;
            this.updateResource(objeto, tipoRecurso);
            this.save();
            this.showLoader = false;
          });
        }
      }
    }
  }

  updateResource(objeto: any, fileType: string): void {
    this.getSafeUrl(objeto, fileType);
  }

  updateResources(): void {
    this.showLoader = true;
    if (this.activity && this.activity.contenido && this.activity.contenido.preguntas) {
      for (let i = 0; i < this.activity.contenido.preguntas.length; i++) {
        this.activity.contenido.preguntas[i].loadedVideo = false;
        if (this.activity.contenido.preguntas[i].path && this.activity.contenido.preguntas[i].path !== '') {
          this.getSafeUrl(this.activity.contenido.preguntas[i], this.activity.contenido.preguntas[i].tipoRecurso);
        }
        if (this.activity.contenido.preguntas[i].tipoRespuestas !== 'Texto') {
          for (let j = 0; j < this.activity.contenido.preguntas[i].respuestas.length; j++) {
            if (this.activity.contenido.preguntas[i].respuestas[j].path && this.activity.contenido.preguntas[i].respuestas[j].path !== '') {
              this.getSafeUrl(this.activity.contenido.preguntas[i].respuestas[j], this.activity.contenido.preguntas[i].tipoRespuestas);
            }
          }
        }
      }
    }
    this.showLoader = false;
  }

  getSafeUrl(object: any, fileType: string): void {
    this.showLoader = true;
    let safeUrl: SafeUrl = '';
    if (object.path) {
      switch (fileType) {
        case 'Audio': {
          this.fileUploadService.getSoundFile(object.path).subscribe(data => {
            const audioPath = URL.createObjectURL(data.body);
            safeUrl = this.domSanitizer.bypassSecurityTrustUrl(audioPath);
            object.safeUrl = safeUrl;
            this.showLoader = false;
          });
          break;
        }
        case 'Imagen': {
          this.fileUploadService.getImageFile(object.path).subscribe(data => {
            const imagePath = URL.createObjectURL(data.body);
            safeUrl = this.domSanitizer.bypassSecurityTrustUrl(imagePath);
            object.safeUrl = safeUrl;
            this.showLoader = false;
          });
          break;
        }
        case 'Video': {
          this.fileUploadService.getVideoThumbnailFile(object.path).subscribe(data => {
            const videoPath = URL.createObjectURL(data.body);
            safeUrl = this.domSanitizer.bypassSecurityTrustUrl(videoPath);
            object.safeUrl = safeUrl;
            this.showLoader = false;
          });
          break;
        }
      }
    }
  }

  showErrorFileSize(event: any): void {
    this.eventManager.broadcast(
      new JhiEventWithContent('constructorApp.validationError', { message: 'constructorApp.curso.validations.fileSize' })
    );
    if (event.target.files) {
      event.target.files = new DataTransfer().files;
    }
  }

  showErrorFileType(event: any): void {
    this.eventManager.broadcast(
      new JhiEventWithContent('constructorApp.validationError', { message: 'constructorApp.curso.validations.fileType' })
    );
    if (event.target.files) {
      event.target.files = new DataTransfer().files;
    }
  }

  deleteExercise(index: number): void {
    if (this.activity.contenido.ejercicios[index].path && this.activity.contenido.ejercicios[index].path !== '') {
      this.removeFromServer(this.activity.contenido.ejercicios[index].path);
    }

    if (this._activity && this._activity.contenido && this._activity.contenido.ejercicios) {
      for (let i = 0; i < this._activity.contenido.ejercicios[index].columnas.length; i++) {
        this.deleteColumn(this._activity.contenido.ejercicios[index].columnas[i]);
      }
      this.activity.contenido.ejercicios.splice(index, 1);
      this.save();
    }
  }

  deleteColumn(column: Columna): void {
    if (column && column.elementos && column.elementos.length && column.tipoElementos !== 'Texto') {
      for (let i = 0; i < column.elementos.length; i++) {
        if (column.elementos[i].path && column.elementos[i].path !== '') {
          this.removeFromServer(column.elementos[i].path!);
        }
      }
      column.elementos = [];
    }
  }

  deleteRow(exercise: Ejercicio, index: number): void {
    if (exercise && exercise.columnas) {
      for (let i = 0; i < exercise.columnas.length; i++) {
        this.deleteElement(exercise.columnas[i], index);
      }
    }
    this.save();
  }

  deleteElement(column: Columna, index: number): void {
    if (column && column.elementos && column.elementos[index]) {
      if (column.elementos[index].path && column.elementos[index].path !== '') {
        this.removeFromServer(column.elementos[index].path!);
      }
      column.elementos.splice(index, 1);
    }
  }

  isActivityDifferent(localActivity: ActividadInteractiva, remoteActivity: ActividadInteractiva): boolean {
    return JSON.stringify(localActivity) === JSON.stringify(remoteActivity);
  }

  getVideo(exercise: Ejercicio): void {
    this.showLoader = true;
    let safeUrl: SafeUrl = '';
    if (exercise.path && exercise.path !== '') {
      this.fileUploadService.getVideoFile(exercise.path).subscribe(data => {
        const videoPath = URL.createObjectURL(data.body);
        safeUrl = this.domSanitizer.bypassSecurityTrustUrl(videoPath);
        exercise.safeUrl = safeUrl;
        exercise.loadedVideo = true;
        this.showLoader = false;
      });
    }
  }

  record(objeto: any, exerciseIndex: number, columnIndex?: number, elementIndex?: number): void {
    if (!this.isOn) {
      this.recordingExerciseIndex = exerciseIndex;
      if (columnIndex !== undefined && elementIndex !== undefined) {
        this.recordingColumnIndex = columnIndex;
        this.recordingElementIndex = elementIndex;
      }
      this.start(objeto);
    } else {
      this.stop(objeto);
    }
  }

  controlAudioDuration(timeLeft: number, objeto: any): void {
    if (!this.isOn) {
      return;
    }
    if (timeLeft >= 0) {
      setTimeout(() => {
        this.recordedTime = this.recordedTime + 1;
        this.timeToShow = this.getTimeFormat(this.recordedTime);
        timeLeft = timeLeft - 1000;
        this.value = Math.floor(((this.maxAudioDuration - timeLeft) * 100) / this.maxAudioDuration);
        this.controlAudioDuration(timeLeft, objeto);
      }, 1000);
    } else {
      this.stop(objeto);
    }
  }

  start(objeto: any): void {
    this.isOn = true;
    this.recorder
      .start()
      .catch((e: any) => {
        this.eventManager.broadcast(new JhiEventWithContent('constructorApp.blockUpdateError', e));
      })
      .then(() => {
        this.controlAudioDuration(this.maxAudioDuration, objeto);
      });
  }

  stop(objeto: any): void {
    this.recordedTime = 0;
    this.deleteResource(objeto);
    this.recordingExerciseIndex = -1;
    this.recordingColumnIndex = -1;
    this.recordingElementIndex = -1;
    this.isOn = false;
    this.recorder
      .stop()
      .getMp3()
      .then(([buffer, blob]: any) => {
        const file = new File(buffer, 'pregunta grabada ' + '.mp3', {
          type: blob.type,
          lastModified: Date.now()
        });
        this.correctFile(file, objeto);
      })
      .catch((e: any) => {
        this.eventManager.broadcast(new JhiEventWithContent('constructorApp.blockUpdateError', e));
      });
  }

  correctFile(file: File, objeto: any): void {
    this.showLoader = true;
    if (this.id) {
      this.fileUploadInteractivasService.pushFileStorage(file, this.id).subscribe(
        (data: any) => {
          if (objeto) {
            objeto.path = data.path;
            this.getSafeUrl(objeto, 'Audio');
          }
          this.value = 0;
          this.save();
          this.showLoader = false;
        },
        error => {
          this.showErrorFileType(error);
        }
      );
    }
  }

  getTimeFormat(seconds: number): string {
    let time = '';
    if (seconds >= 3600) {
      const h = Math.floor(seconds / 3600);
      time = time + h + ':';
      seconds = seconds - h * 3600;
    }
    if (seconds >= 60) {
      const m = Math.floor(seconds / 60);
      time = time + m + ':';
      seconds = seconds - m * 60;
    } else {
      time = time + '0:';
    }
    if (seconds < 10) {
      time = time + '0';
    }
    time = time + seconds;
    return time;
  }

  allowAdding(exercise: Ejercicio): boolean {
    let allow = true;
    if (exercise && exercise.columnas && exercise.columnas[0] && exercise.columnas[0].elementos) {
      if (exercise.columnas[0].elementos.length >= 10) {
        allow = false;
      }
    }
    return allow;
  }
}
