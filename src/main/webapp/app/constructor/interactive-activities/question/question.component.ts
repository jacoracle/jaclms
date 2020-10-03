import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ActividadInteractiva } from 'app/shared/model/actividad-interactiva.model';
import { Preguntas, Respuestas } from './../../../shared/model/actividad-pregunta.model';
import { ActivityService } from 'app/services/activity.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ContenidoActividadService } from 'app/entities/contenido/contenido-actividad.service';
import { FileUploadInteractivasService } from 'app/services/file-upload-interactivas.service';
import { JhiEventManager, JhiEventWithContent } from 'ng-jhipster';
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
  // answerTypes = ['Texto', 'Imagen', 'Audio', 'Video'];
  answerTypes = ['Texto', 'Imagen'];
  // resourceTypes = ['Imagen', 'Audio', 'Video'];
  resourceTypes = ['Imagen'];
  showLoader = false;
  maxImageSize = 5120000;
  allowedFileTypes: any = ['image/jpg', 'image/png', 'image/jpeg', 'video/mp4', 'application/pdf', 'audio/mpeg'];
  selectedFiles = [];
  @Input() id?: number;
  @ViewChild('resourceInput', { static: false }) fileInput: any;

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

  checkCorrectAnswers(pregunta: Preguntas, answerIndex: number): void {
    if (pregunta.tipoPregunta !== 'Respuesta múltiple' && pregunta.respuestas) {
      for (let i = 0; i < pregunta.respuestas.length; i++) {
        if (i !== answerIndex) {
          pregunta.respuestas[i].correcta = false;
        }
      }
    }
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
      tipoRecurso: ''
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
      this.contenidoActividadService.update(this._activity).subscribe(() => {
        this.activitiService.setActivity(this.activity);
        this.showLoader = false;
      });
    }
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
  }

  addAnswer(question: Preguntas, correct?: boolean, answer?: string): void {
    if (!question.respuestas) {
      question.respuestas = [];
    }
    question.respuestas.push(this.createAnswer(correct, answer));
  }

  validateQuestion(): void {}

  validateAnswer(): void {}

  deleteResources(): void {}

  deleteResource(pregunta: Preguntas): void {
    pregunta.path = '';
    pregunta.safeUrl = '';
    this.selectedFiles = [];
    this.fileInput.nativeElement.value = '';
  }

  selectFile(event: any, objeto: any): void {
    if (event.target.files.length) {
      // Validar tamaño máximo
      if (event.target.files[0].size > this.maxImageSize) {
        this.showErrorFileSize(event);
        return;
        // Validar tipo de archivo
      } else if (!this.allowedFileTypes.includes(event.target.files[0].type)) {
        this.showErrorFileType(event);
        return;
      } else {
        this.selectedFiles = event.target.files;
        this.showLoader = true;
        if (event.target.files[0] && this.id) {
          this.fileUploadInteractivasService.pushFileStorage(event.target.files[0], this.id).subscribe(data => {
            objeto.path = data.path;
            this.updateResources();
            this.showLoader = false;
          });
        }
      }
    }
  }

  updateResources(): void {
    if (this.activity && this.activity.contenido && this.activity.contenido.preguntas) {
      for (let i = 0; i < this.activity.contenido.preguntas.length; i++) {
        if (this.activity.contenido.preguntas[i].path && this.activity.contenido.preguntas[i].path !== '') {
          this.getSafeUrl(this.activity.contenido.preguntas[i]);
        }
        if (this.activity.contenido.preguntas[i].tipoRespuestas !== 'Texto') {
          for (let j = 0; j < this.activity.contenido.preguntas[i].respuestas.length; j++) {
            if (this.activity.contenido.preguntas[i].respuestas[j].path && this.activity.contenido.preguntas[i].respuestas[j].path !== '') {
              this.getSafeUrl(this.activity.contenido.preguntas[i].respuestas[j]);
            }
          }
        }
      }
    }
  }

  getSafeUrl(object: any): void {
    let safeUrl: SafeUrl = '';
    if (object.path) {
      this.fileUploadService.getImageFile(object.path).subscribe(data => {
        const imagePath = URL.createObjectURL(data.body);
        safeUrl = this.domSanitizer.bypassSecurityTrustUrl(imagePath);
        object.safeUrl = safeUrl;
      });
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
    this.activity.contenido.preguntas.splice(index, 1);
  }

  deleteAnswer(pregunta: Preguntas, index: number): void {
    if (pregunta.respuestas) {
      pregunta.respuestas.splice(index, 1);
      this.checkOnlyAnswer(pregunta);
    }
  }

  checkOnlyAnswer(pregunta: Preguntas): void {
    if (pregunta.respuestas && pregunta.respuestas.length === 1) {
      pregunta.respuestas[0].correcta = true;
    }
  }
}
