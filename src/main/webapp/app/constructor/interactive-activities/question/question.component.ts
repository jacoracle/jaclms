import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ActividadInteractiva } from 'app/shared/model/actividad-interactiva.model';
import { Preguntas, Respuestas } from './../../../shared/model/actividad-pregunta.model';
import { ActivityService } from 'app/services/activity.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ContenidoActividadService } from 'app/entities/contenido/contenido-actividad.service';
import { FileUploadInteractivasService } from 'app/services/file-upload-interactivas.service';
import { JhiEventManager, JhiEventWithContent, JhiAlert } from 'ng-jhipster';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { FileUploadService } from 'app/services/file-upload.service';

@Component({
  selector: 'jhi-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {
  _activity?: ActividadInteractiva;
  @Input()
  set activity(activity: ActividadInteractiva) {
    this._activity = activity;
    this.updateResources();
  }
  get activity(): ActividadInteractiva {
    return this._activity!;
  }
  questionTypes = ['Respuesta única', 'Respuesta múltiple', 'Verdadero Falso'];
  answerTypes = ['Texto', 'Imagen', 'Audio'];
  // answerTypes = ['Texto', 'Imagen'];
  resourceTypes = ['Imagen', 'Audio', 'Video'];
  // resourceTypes = ['Imagen'];
  showLoader = false;
  maxImageSize = 5120000;
  allowedAudioTypes: any = ['audio/mpeg'];
  allowedImageTypes: any = ['image/jpg', 'image/png', 'image/jpeg'];
  allowedVideoTypes: any = ['video/mp4'];
  selectedFiles = [];
  @Input() id?: number;
  @ViewChild('resourceInput', { static: false }) fileInput: any;
  alerts: JhiAlert[] = [];

  constructor(
    private activitiService: ActivityService,
    public activeModal: NgbActiveModal,
    private contenidoActividadService: ContenidoActividadService,
    private fileUploadInteractivasService: FileUploadInteractivasService,
    public eventManager: JhiEventManager,
    private domSanitizer: DomSanitizer,
    private fileUploadService: FileUploadService
  ) {}

  ngOnInit(): void {}

  emptyAnswers(pregunta: Preguntas): void {
    if (pregunta.respuestas) {
      for (let i = 0; i < pregunta.respuestas.length; i++) {
        if (pregunta.respuestas[i].path && pregunta.respuestas[i].path !== '') {
          this.removeFromServer(pregunta.respuestas[i].path!);
        }
      }
      pregunta.respuestas = [];
    }
  }

  changeQuestionType(pregunta: Preguntas, questionType: string): any {
    if (questionType === 'Verdadero Falso') {
      pregunta.tipoRespuestas = 'Texto';
      this.addTrueFalse(pregunta);
    }
    if (questionType === 'Respuesta única') {
      this.oneCorrectOnly(pregunta);
    }
    this.save();
  }

  oneCorrectOnly(pregunta: Preguntas): void {
    let found = false;
    if (pregunta.respuestas) {
      for (let i = 0; i < pregunta.respuestas.length; i++) {
        if (found) {
          pregunta.respuestas[i].correcta = false;
        }
        if (!found && pregunta.respuestas[i].correcta === true) {
          found = true;
        }
      }
    }
  }

  changeAnswerType(pregunta: Preguntas): void {
    this.emptyAnswers(pregunta);
    this.addAnswer(pregunta, true);
  }

  changeResourceType(pregunta: Preguntas): void {
    if (pregunta.path && pregunta.path !== '') {
      this.deleteResource(pregunta);
    }
  }

  checkCorrectAnswers(pregunta: Preguntas, answerIndex: number): void {
    if (pregunta.tipoPregunta !== 'Respuesta múltiple' && pregunta.respuestas) {
      for (let i = 0; i < pregunta.respuestas.length; i++) {
        if (i !== answerIndex) {
          pregunta.respuestas[i].correcta = false;
        }
      }
    }
    this.save();
  }

  blockOnlyAnswer(pregunta: Preguntas, respuesta: Respuestas): boolean {
    let onlyAnswer = false;
    if (respuesta.correcta && respuesta.correcta === true) {
      let correctAnswers = 0;
      if (pregunta.respuestas) {
        for (let i = 0; i < pregunta.respuestas.length; i++) {
          if (pregunta.respuestas[i].correcta === true) {
            correctAnswers++;
          }
        }
        if (correctAnswers === 1) {
          onlyAnswer = true;
        } else {
          onlyAnswer = false;
        }
      }
    }
    return onlyAnswer;
  }

  addTrueFalse(pregunta: Preguntas): void {
    this.emptyAnswers(pregunta);
    this.addAnswer(pregunta, true, 'Verdadero');
    this.addAnswer(pregunta, false, 'Falso');
  }

  createQuestion(): Preguntas {
    return {
      ...new Preguntas(),
      pregunta: '',
      tipoPregunta: 'Respuesta única',
      respuestas: [],
      calificada: false,
      marcada: false,
      correcta: false,
      tipoRespuestas: 'Texto',
      tipoRecurso: '',
      loadedVideo: false
    };
  }

  createAnswer(correct?: boolean, answer?: string): Respuestas {
    return {
      ...new Respuestas(),
      respuesta: answer ? answer : '',
      correcta: correct ? correct : false,
      seleccionada: false,
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

  addQuestion(): void {
    if (this._activity && this._activity.contenido) {
      if (!this._activity.contenido.preguntas) {
        this._activity.contenido.preguntas = [];
      }
      const question = this.createQuestion();
      this.addAnswer(question, true);
      this._activity.contenido.preguntas.push(question);
    }
    this.save();
  }

  addAnswer(question: Preguntas, correct?: boolean, answer?: string): void {
    if (!question.respuestas) {
      question.respuestas = [];
    }
    question.respuestas.push(this.createAnswer(correct, answer));
    this.save();
  }

  deleteResource(pregunta: Preguntas): void {
    if (pregunta.path) {
      this.removeFromServer(pregunta.path);
      pregunta.path = '';
      pregunta.safeUrl = '';
      pregunta.loadedVideo = false;
      this.selectedFiles = [];
      this.fileInput.nativeElement.value = '';
      this.save();
    }
  }

  removeFromServer(path: string): void {
    this.fileUploadService.deleteFile(path).subscribe(() => {});
  }

  selectFile(event: any, objeto: any, tipoRecurso: string): void {
    if (event.target.files.length) {
      switch (tipoRecurso) {
        case 'Audio': {
          if (!this.allowedAudioTypes.includes(event.target.files[0].type)) {
            this.showErrorFileType(event);
            return;
          }
          break;
        }
        case 'Image': {
          if (!this.allowedImageTypes.includes(event.target.files[0].type)) {
            this.showErrorFileType(event);
            return;
          }
          break;
        }
        case 'Video': {
          if (!this.allowedVideoTypes.includes(event.target.files[0].type)) {
            this.showErrorFileType(event);
            return;
          }
          break;
        }
      }
      if (event.target.files[0].size > this.maxImageSize) {
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

  deleteQuestion(index: number): void {
    if (this.activity.contenido.preguntas[index].path && this.activity.contenido.preguntas[index].path !== '') {
      this.removeFromServer(this.activity.contenido.preguntas[index].path);
    }
    for (let i = 0; i < this.activity.contenido.preguntas[index].respuestas.length; i++) {
      if (
        this.activity.contenido.preguntas[index].respuestas[i].path &&
        this.activity.contenido.preguntas[index].respuestas[i].path !== ''
      ) {
        this.removeFromServer(this.activity.contenido.preguntas[index].respuestas[i].path);
      }
    }
    this.activity.contenido.preguntas.splice(index, 1);
    this.save();
  }

  deleteAnswer(pregunta: Preguntas, index: number): void {
    if (pregunta.respuestas) {
      if (pregunta.respuestas[index] && pregunta.respuestas[index].path && pregunta.respuestas[index].path !== '') {
        this.removeFromServer(pregunta.respuestas[index].path!);
      }
      pregunta.respuestas.splice(index, 1);
      this.checkOnlyAnswer(pregunta);
    }
    this.save();
  }

  checkOnlyAnswer(pregunta: Preguntas): void {
    if (pregunta.respuestas && pregunta.respuestas.length === 1) {
      pregunta.respuestas[0].correcta = true;
    }
  }

  isActivityDifferent(localActivity: ActividadInteractiva, remoteActivity: ActividadInteractiva): boolean {
    return JSON.stringify(localActivity) === JSON.stringify(remoteActivity);
  }

  getVideo(pregunta: Preguntas): void {
    this.showLoader = true;
    let safeUrl: SafeUrl = '';
    if (pregunta.path && pregunta.path !== '') {
      this.fileUploadService.getVideoFile(pregunta.path).subscribe(data => {
        const videoPath = URL.createObjectURL(data.body);
        safeUrl = this.domSanitizer.bypassSecurityTrustUrl(videoPath);
        pregunta.safeUrl = safeUrl;
        pregunta.loadedVideo = true;
        this.showLoader = false;
      });
    }
  }
}
