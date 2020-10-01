import { Component, OnInit, Input } from '@angular/core';
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
  questionTypes = ['Respuesta única', 'Respuesta multipe', 'Verdadero Falso'];
  answerTypes = ['Texto', 'Imagen', 'Audio', 'Video'];
  resourceTypes = ['Imagen', 'Audio', 'Video'];
  showLoader = false;
  maxImageSize = 5120000;
  allowedFileTypes: any = ['image/jpg', 'image/png', 'image/jpeg', 'video/mp4', 'application/pdf', 'audio/mpeg'];
  selectedFiles = [];
  @Input() id?: number;

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

  changeQuestionType(pregunta: Preguntas, questionType: string): any {
    if (questionType === 'Verdadero Falso') {
      pregunta.tipoRespuestas = 'Texto';
      this.addTrueFalse(pregunta);
    }
  }

  addTrueFalse(pregunta: Preguntas): void {
    const respuestas = ['Verdadero', 'Falso'];
    pregunta.respuestas = [];
    for (let i = 0; i < respuestas.length; i++) {
      this.addAnswer(pregunta, respuestas[i]);
    }
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

  createAnswer(answer?: string): Respuestas {
    return {
      ...new Respuestas(),
      respuesta: answer ? answer : '',
      correcta: false,
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
      this.addAnswer(question);
      this._activity.contenido.preguntas.push(question);
    }
  }

  addAnswer(question: Preguntas, answer?: string): void {
    if (!question.respuestas) {
      question.respuestas = [];
    }
    if (answer) {
      question.respuestas.push(this.createAnswer(answer));
    } else {
      question.respuestas.push(this.createAnswer());
    }
  }

  validateQuestion(): void {}

  validateAnswer(): void {}

  deleteResources(): void {}

  deleteResource(): void {}

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

  getSafeUrl(answer: Respuestas): void {
    let safeUrl: SafeUrl = '';
    if (answer.path) {
      this.fileUploadService.getImageFile(answer.path).subscribe(data => {
        const imagePath = URL.createObjectURL(data.body);
        safeUrl = this.domSanitizer.bypassSecurityTrustUrl(imagePath);
        answer.safeUrl = safeUrl;
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

  deleteAnswer(question: Preguntas, index: number): void {
    if (question.respuestas) {
      question.respuestas.splice(index, 1);
    }
  }
}
