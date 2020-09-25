import { Component, Input, ViewChild, ViewEncapsulation } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import UtilActivityQuestions from 'app/shared/activity-questions-preview/util-activity-questions';
import { JhiEventManager, JhiEventWithContent } from 'ng-jhipster';
import { FileUploadInteractivasService } from 'app/services/file-upload-interactivas.service';
import { IContenido } from 'app/shared/model/contenido.model';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'jhi-activity-answers',
  templateUrl: './activity-answers.component.html',
  styleUrls: ['./activity-answers.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ActivityAnswersComponent {
  @Input()
  indQuestion = 0;

  @Input()
  activityForm = new FormGroup({});

  @Input()
  submitted = false;

  @Input()
  groupQuestion = new FormGroup({});

  @Input()
  typeQuestion = '';

  @Input()
  filesAnswersDelete: string[] = [];

  @Input()
  id = 0;

  @ViewChild('fileInput', { static: false }) fileInput: any;
  maxImageSize = 5120000;
  allowedFileTypes: any = ['image/jpg', 'image/png', 'image/jpeg', 'audio/mpeg'];
  selectedFiles = [];
  showLoader = false;
  imageFileTypes: any = ['image/jpg', 'image/png', 'image/jpeg'];

  constructor(
    public eventManager: JhiEventManager,
    public fileUploadInteractivas: FileUploadInteractivasService,
    private domSanitizer: DomSanitizer
  ) {}

  onRadioChange(indQuestion: number, indAnswer: number): void {
    UtilActivityQuestions.onRadioChange(this.activityForm, indQuestion, indAnswer);
  }

  onCheckChange(): void {
    UtilActivityQuestions.refreshAnswers(this.activityForm);
  }

  isValidAnswer(indQuestion: number, indAnswer: number): boolean {
    const controlRespuesta = UtilActivityQuestions.controlRespuesta(this.activityForm, indQuestion, indAnswer);
    UtilActivityQuestions.refreshForm(this.activityForm);
    if (this.submitted) {
      if (controlRespuesta) {
        return controlRespuesta.status === 'VALID';
      } else {
        return true;
      }
    } else {
      return true;
    }
  }

  addAnswer(indQuestion: number): any {
    const controlesRespuestas = UtilActivityQuestions.controlesRespuestas(this.activityForm, indQuestion);
    UtilActivityQuestions.refreshForm(this.activityForm);
    if (controlesRespuestas.length < 4) {
      controlesRespuestas.push(UtilActivityQuestions.formGroupVacioRespuesta(false));
    }
    UtilActivityQuestions.refreshForm(this.activityForm);
  }

  removeAnswer(indQuestion: number, indAnswer: number): any {
    UtilActivityQuestions.refreshForm(this.activityForm);
    const controlesRespuestas = UtilActivityQuestions.controlesRespuestas(this.activityForm, indQuestion);
    let path;
    let correctaPorSeleccionar;
    let correctaEliminar;
    if (indAnswer > -1 && controlesRespuestas.length > 1) {
      path = UtilActivityQuestions.campoRespuesta(this.activityForm, indQuestion, indAnswer, 'path');
      if (path) {
        this.filesAnswersDelete.push(path.value);
      }
      correctaEliminar = UtilActivityQuestions.campoRespuesta(this.activityForm, indQuestion, indAnswer, 'correcta');
      controlesRespuestas.splice(indAnswer, 1);
      correctaPorSeleccionar = UtilActivityQuestions.campoRespuesta(this.activityForm, indQuestion, 0, 'correcta');
      if (correctaEliminar && correctaPorSeleccionar && correctaEliminar.value === true && this.isUnic()) {
        correctaPorSeleccionar.setValue(true);
      }
    }
    UtilActivityQuestions.refreshForm(this.activityForm);
  }

  controlesRespuestas(indQuestion: number): AbstractControl[] {
    return UtilActivityQuestions.controlesRespuestas(this.activityForm, indQuestion);
  }

  refreshQuestion(indQuestion: number): void {
    UtilActivityQuestions.refreshAnswersQuestion(this.activityForm, indQuestion);
    UtilActivityQuestions.refreshQuestion(this.activityForm, indQuestion);
  }

  campoRespuestaCorrecta(indQuestion: number, indAnswer: number): boolean {
    const campoRespuesta = UtilActivityQuestions.campoRespuesta(this.activityForm, indQuestion, indAnswer, 'correcta');
    if (campoRespuesta) {
      return campoRespuesta.value;
    } else {
      return false;
    }
  }

  valorCampoRespuesta(nombreImagen: String, indQuestion: number, indAnswer: number): void {
    const campoRespuesta = UtilActivityQuestions.campoRespuesta(this.activityForm, indQuestion, indAnswer, 'respuesta');
    if (campoRespuesta) {
      campoRespuesta.setValue(nombreImagen);
    }
  }

  valorCampoPath(pathImagen: String, indQuestion: number, indAnswer: number): void {
    const campoPath = UtilActivityQuestions.campoRespuesta(this.activityForm, indQuestion, indAnswer, 'path');
    if (campoPath) {
      campoPath.setValue(pathImagen);
    }
  }

  onKeyDown(event: any): boolean {
    return UtilActivityQuestions.onKeyDown(event);
  }

  /* Recibe archivo seleccionado, valida tamaño y tipo, y sube el archivo a servidor. Obtiene src necesario para mostrar en componente y en propiedades.
   * @param event  Evento con archivo seleccionado.
   */
  selectFile(event: any, indQuestion: number, indAnswer: number): void {
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
        this.showLoader = true;
        this.fileUploadInteractivas.pushFileStorage(this.selectedFiles[0], this.id).subscribe(
          (data: any) => {
            this.validateCalledToService(this.castObjectAsContenido(data), event.target.files[0].type, event, indQuestion, indAnswer);
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

  validateCalledToService(obj: IContenido, fileType: string, event: any, indQuestion: number, indAnswer: number): void {
    const campoSafeUrl = UtilActivityQuestions.campoRespuesta(this.activityForm, indQuestion, indAnswer, 'safeUrl');
    const loadedSafeUrl = UtilActivityQuestions.campoRespuesta(this.activityForm, indQuestion, indAnswer, 'loadedSafeUrl');
    if (
      ((this.isMediaImage() && this.imageFileTypes.includes(fileType)) || (this.isMediaAudio() && fileType === 'audio/mpeg')) &&
      campoSafeUrl &&
      loadedSafeUrl
    ) {
      this.valorCampoRespuesta(obj.nombre!, indQuestion, indAnswer);
      this.valorCampoPath(obj.contenido!, indQuestion, indAnswer);
      campoSafeUrl.setValue('');
      loadedSafeUrl.setValue(false);
      if (this.isMediaImage()) {
        this.getImage(obj.contenido!, indQuestion, indAnswer);
      } else {
        this.getAudio(obj.contenido!, indQuestion, indAnswer);
      }
    } else {
      this.showErrorFileType(event);
    }
  }

  getImage(path: string, indQuestion: number, indAnswer: number): void {
    UtilActivityQuestions.getImage(this.activityForm, path, indQuestion, indAnswer, this.fileUploadInteractivas, this.domSanitizer);
  }

  getAudio(path: string, indQuestion: number, indAnswer: number): void {
    UtilActivityQuestions.getAudio(this.activityForm, path, indQuestion, indAnswer, this.fileUploadInteractivas, this.domSanitizer);
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

  noWriteMedia(): boolean {
    return !this.isMutimedia();
  }

  isUnic(): boolean {
    return UtilActivityQuestions.isUnic(this.typeQuestion);
  }

  isMultiple(): boolean {
    return UtilActivityQuestions.isMultiple(this.typeQuestion);
  }

  isMutimedia(): boolean {
    return UtilActivityQuestions.isMutimedia(this.typeQuestion);
  }

  isMediaAudio(): boolean {
    return UtilActivityQuestions.isMediaAudio(this.typeQuestion);
  }

  isMediaImage(): boolean {
    return UtilActivityQuestions.isMediaImage(this.typeQuestion);
  }
}
