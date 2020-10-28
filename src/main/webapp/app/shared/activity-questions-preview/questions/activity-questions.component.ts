import { Component, Input, ViewChild, ViewEncapsulation } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import UtilActivityQuestions from 'app/shared/activity-questions-preview/util-activity-questions';
import { FileUploadInteractivasService } from 'app/services/file-upload-interactivas.service';
import { JhiEventManager, JhiEventWithContent } from 'ng-jhipster';
import { IContenido } from 'app/shared/model/contenido.model';
import { DomSanitizer } from '@angular/platform-browser';
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import MicRecorder from 'mic-recorder-to-mp3';

@Component({
  selector: 'jhi-activity-questions',
  templateUrl: './activity-questions.component.html',
  styleUrls: ['./activity-questions.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ActivityQuestionsComponent {
  @Input()
  activityForm = new FormGroup({});

  @Input()
  submitted = false;

  @Input()
  typeQuestion = '';

  @Input()
  filesAnswersDelete: string[] = [];

  @Input()
  id = 0;

  @ViewChild('fileInput', { static: false }) fileInput: any;
  maxImageSize = 5120000;
  allowedFileTypes: any = ['audio/mpeg', 'audio/mp3'];
  selectedFiles = [];
  showLoader = false;

  recorder = new MicRecorder({
    bitRate: 128
  });
  isOn = false;

  constructor(
    private formBuilder: FormBuilder,
    public fileUploadInteractivas: FileUploadInteractivasService,
    public eventManager: JhiEventManager,
    private domSanitizer: DomSanitizer
  ) {}

  isValidQuestion(indQuestion: number): boolean {
    let controlPregunta;
    UtilActivityQuestions.refreshForm(this.activityForm);
    if (this.submitted) {
      let response = true;
      controlPregunta = UtilActivityQuestions.controlPregunta(this.activityForm, indQuestion);
      if (controlPregunta) {
        response = controlPregunta.status === 'VALID';
      }
      return response;
    } else {
      return true;
    }
  }

  addQuestion(): any {
    const preguntas = UtilActivityQuestions.preguntas(this.activityForm);
    if (preguntas) {
      const controlesPreguntas = preguntas.controls;
      let campoTipoPregunta;

      UtilActivityQuestions.refreshForm(this.activityForm);
      if (controlesPreguntas.length < 10) {
        controlesPreguntas.push(UtilActivityQuestions.formGroupVacioPregunta(this.formBuilder));
      }

      for (let i = 0; i < controlesPreguntas.length; i++) {
        campoTipoPregunta = controlesPreguntas[i].get('tipoPregunta');
        if (campoTipoPregunta) {
          campoTipoPregunta.setValue(this.typeQuestion);
        }
        if (this.isVerdaderoFalso()) {
          UtilActivityQuestions.verdaderoFalso(this.activityForm, i);
        }
      }
      UtilActivityQuestions.refreshForm(this.activityForm);
    }
  }

  removeQuestion(indQuestion: number): any {
    UtilActivityQuestions.refreshForm(this.activityForm);
    const cantidadRespuestas = UtilActivityQuestions.controlesRespuestas(this.activityForm, indQuestion).length;
    const preguntas = UtilActivityQuestions.preguntas(this.activityForm);
    let path;
    if (preguntas) {
      const controlesPreguntas = preguntas.controls;
      if (indQuestion > -1 && controlesPreguntas.length > 1) {
        for (let i = 0; i < cantidadRespuestas; i++) {
          path = UtilActivityQuestions.campoRespuesta(this.activityForm, indQuestion, i, 'path');
          if (path) {
            this.filesAnswersDelete.push(path.value);
          }
        }
        controlesPreguntas.splice(indQuestion, 1);
      }
      UtilActivityQuestions.refreshForm(this.activityForm);
    }
  }

  controlesPreguntas(): AbstractControl[] {
    return UtilActivityQuestions.controlesPreguntas(this.activityForm);
  }

  onKeyDown(event: any): boolean {
    return UtilActivityQuestions.onKeyDown(event);
  }

  /* Recibe archivo seleccionado, valida tamaño y tipo, y sube el archivo a servidor. Obtiene src necesario para mostrar en componente y en propiedades.
   * @param event  Evento con archivo seleccionado.
   */
  selectFile(event: any, indQuestion: number): void {
    if (event.target.files.length === 1) {
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
        this.correctFile(this.selectedFiles[0], event.target.files[0].type, indQuestion, event);
      }
    }
  }

  correctFile(file: File, type: string, indQuestion: number, event: any): void {
    this.showLoader = true;
    this.fileUploadInteractivas.pushFileStorage(file, this.id).subscribe(
      (data: any) => {
        this.validateCalledToService(this.castObjectAsContenido(data), type, event, indQuestion);
      },
      error => {
        this.showErrorFileType(error);
      }
    );
    setTimeout(() => {
      const inputQuestion = document.getElementById('id_question' + indQuestion);
      if (inputQuestion) {
        inputQuestion.focus();
        this.showLoader = false;
        this.refreshQuestion(indQuestion);
      }
    }, 1500);
  }

  showErrorFileSize(event: any): void {
    this.eventManager.broadcast(
      new JhiEventWithContent('constructorApp.validationError', { message: 'constructorApp.curso.validations.fileSize' })
    );
    event.target.files = new DataTransfer().files;
  }

  showErrorFileType(event: any): void {
    this.eventManager.broadcast(
      new JhiEventWithContent('constructorApp.validationError', { message: 'constructorApp.curso.validations.fileType' })
    );
    event.target.files = new DataTransfer().files;
  }

  refreshQuestion(indQuestion: number): void {
    UtilActivityQuestions.refreshAnswersQuestion(this.activityForm, indQuestion);
    UtilActivityQuestions.refreshQuestion(this.activityForm, indQuestion);
  }

  validateCalledToService(obj: IContenido, fileType: string, event: any, indQuestion: number): void {
    const campoSafeUrl = UtilActivityQuestions.campoPregunta(this.activityForm, indQuestion, 'safeUrl');
    const loadedSafeUrl = UtilActivityQuestions.campoPregunta(this.activityForm, indQuestion, 'loadedSafeUrl');
    if (this.isQuestionAudio() && this.allowedFileTypes.includes(fileType) && campoSafeUrl && loadedSafeUrl) {
      this.valorCampoPregunta(obj.nombre!, indQuestion);
      this.valorCampoPath(obj.contenido!, indQuestion);
      campoSafeUrl.setValue('');
      loadedSafeUrl.setValue(false);
      this.getAudioQuestion(obj.contenido!, indQuestion);
    } else {
      this.showErrorFileType(event);
    }
  }

  getAudioQuestion(path: string, indQuestion: number): void {
    UtilActivityQuestions.getAudioQuestion(this.activityForm, path, indQuestion, this.fileUploadInteractivas, this.domSanitizer);
  }

  valorCampoPregunta(nombreImagen: String, indQuestion: number): void {
    const campoRespuesta = UtilActivityQuestions.campoPregunta(this.activityForm, indQuestion, 'pregunta');
    if (campoRespuesta) {
      campoRespuesta.setValue(nombreImagen);
    }
  }

  valorCampoPath(pathImagen: String, indQuestion: number): void {
    const campoPath = UtilActivityQuestions.campoPregunta(this.activityForm, indQuestion, 'path');
    if (campoPath) {
      campoPath.setValue(pathImagen);
    }
  }

  /**
   * Castea el objeto devuelto por servicio cuando se carga un archivo multimedia
   * @param data objeto que contiene las propiedades que seran seteadas a IContenido
   */
  castObjectAsContenido(data: any): IContenido {
    return {
      contenido: data.path,
      extension: data.extension,
      nombre: data.nombre,
      peso: data.peso
    };
  }

  isQuestionAudio(): boolean {
    return UtilActivityQuestions.isQuestionAudio(this.typeQuestion);
  }

  isVerdaderoFalso(): boolean {
    return UtilActivityQuestions.isVerdaderoFalso(this.typeQuestion);
  }

  noWriteMedia(): boolean {
    return !this.isQuestionAudio();
  }

  record(event: any, indQuestion: number): void {
    if (!this.isOn) {
      this.start();
    } else {
      this.stop(event, indQuestion);
    }
  }

  start(): void {
    this.isOn = true;
    this.recorder.start().catch((e: any) => {
      this.eventManager.broadcast(new JhiEventWithContent('constructorApp.blockUpdateError', e));
    });
  }

  stop(event: any, indQuestion: number): void {
    this.isOn = false;
    this.recorder
      .stop()
      .getMp3()
      .then(([buffer, blob]: any) => {
        const indiceUser = indQuestion + 1;
        const file = new File(buffer, 'pregunta grabada ' + indiceUser + '.mp3', {
          type: blob.type,
          lastModified: Date.now()
        });
        this.correctFile(file, file.type, indQuestion, event);
      })
      .catch((e: any) => {
        this.eventManager.broadcast(new JhiEventWithContent('constructorApp.blockUpdateError', e));
      });
  }
}
