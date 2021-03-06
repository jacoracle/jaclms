import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { OpcionPreguntas, OpcionConcatenada } from 'app/shared/model/enumerations/tipo-actividad.model';
import { IActividadPregunta } from 'app/shared/model/actividad-pregunta.model';
import { cantidadAtributos } from 'app/shared/util/util';
import { FileUploadInteractivasService } from 'app/services/file-upload-interactivas.service';
import { DomSanitizer } from '@angular/platform-browser';

export default class UtilActivityQuestions {
  static arrayFormGroupPreguntas(jsonForm: IActividadPregunta | undefined, formBuilder: FormBuilder): FormArray {
    const preguntas = formBuilder.array([]);
    if (jsonForm && cantidadAtributos(jsonForm) > 0) {
      for (let i = 0; i < jsonForm.preguntas.length; i++) {
        preguntas.push(
          new FormGroup({
            pregunta: new FormControl(jsonForm.preguntas[i].pregunta, [Validators.required, Validators.maxLength(100)]),
            tipoPregunta: new FormControl(jsonForm.preguntas[i].tipoPregunta, [Validators.required]),
            respuestas: UtilActivityQuestions.arrayFormGroupRespuestas(jsonForm, i, formBuilder),
            calificada: new FormControl(jsonForm.preguntas[i].calificada, [Validators.required]),
            marcada: new FormControl(jsonForm.preguntas[i].marcada, [Validators.required]),
            correcta: new FormControl(jsonForm.preguntas[i].correcta, [Validators.required]),
            path: new FormControl(jsonForm.preguntas[i].path),
            safeUrl: new FormControl(),
            loadedSafeUrl: new FormControl(false)
          })
        );
      }
    } else {
      preguntas.push(UtilActivityQuestions.formGroupVacioPregunta(formBuilder));
    }
    return preguntas;
  }

  static formGroupVacioPregunta(formBuilder: FormBuilder): FormGroup {
    return new FormGroup({
      pregunta: new FormControl('', [Validators.required, Validators.maxLength(100)]),
      tipoPregunta: new FormControl(OpcionPreguntas.UNICA, [Validators.required]),
      respuestas: UtilActivityQuestions.arrayFormGroupRespuestas(undefined, 0, formBuilder),
      calificada: new FormControl(false, [Validators.required]),
      marcada: new FormControl(false, [Validators.required]),
      correcta: new FormControl(false, [Validators.required]),
      path: new FormControl(''),
      safeUrl: new FormControl(''),
      loadedSafeUrl: new FormControl(false)
    });
  }

  static arrayFormGroupRespuestas(jsonForm: IActividadPregunta | undefined, indQuestion: number, formBuilder: FormBuilder): FormArray {
    const respuestas = formBuilder.array([]);
    let respuestasJson;
    if (jsonForm && cantidadAtributos(jsonForm) > 0) {
      respuestasJson = jsonForm.preguntas[indQuestion].respuestas;
      if (respuestasJson) {
        for (let i = 0; i < respuestasJson.length; i++) {
          respuestas.push(
            new FormGroup({
              respuesta: new FormControl(
                {
                  value: respuestasJson[i].respuesta,
                  disabled:
                    jsonForm.tipoActividad.opcionConcatenada === OpcionConcatenada.PREG_TEXTO_RESP_UNICA_VERDADEROFALSO ||
                    jsonForm.tipoActividad.opcionConcatenada === OpcionConcatenada.PREG_AUDIO_RESP_UNICA_VERDADEROFALSO ||
                    jsonForm.tipoActividad.opcionConcatenada === OpcionConcatenada.PREG_TEXTO_RESP_UNICA_IMAGEN ||
                    jsonForm.tipoActividad.opcionConcatenada === OpcionConcatenada.PREG_TEXTO_RESP_MULTIPLE_IMAGEN
                },
                [Validators.required, Validators.maxLength(50)]
              ),
              correcta: new FormControl(respuestasJson[i].correcta, [Validators.required]),
              seleccionada: new FormControl(respuestasJson[i].seleccionada, [Validators.required]),
              path: new FormControl(respuestasJson[i].path),
              safeUrl: new FormControl(),
              loadedSafeUrl: new FormControl(false)
            })
          );
        }
      }
    } else {
      respuestas.push(UtilActivityQuestions.formGroupVacioRespuesta(true));
    }
    return respuestas;
  }

  static formGroupVacioRespuesta(esPrimer: boolean): FormGroup {
    return new FormGroup({
      respuesta: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      correcta: new FormControl(esPrimer, [Validators.required]),
      seleccionada: new FormControl(false, [Validators.required]),
      path: new FormControl(''),
      safeUrl: new FormControl(''),
      loadedSafeUrl: new FormControl(false)
    });
  }

  static typeQuestion(activityForm: FormGroup): string {
    let campoOpcionConcatenada;
    let campoOpcion;
    let campoSubtipo;
    let tipoPregunta;
    let controlTipoActividad;
    let opcion;
    let subtipo;
    if (activityForm) {
      controlTipoActividad = activityForm.controls['tipoActividad'];
      if (controlTipoActividad) {
        campoOpcionConcatenada = controlTipoActividad.get('opcionConcatenada');
        campoOpcion = controlTipoActividad.get('opcion');
        campoSubtipo = controlTipoActividad.get('subtipo');
        if (campoOpcionConcatenada && campoOpcion && campoSubtipo) {
          tipoPregunta = campoOpcionConcatenada.value;
          if (tipoPregunta && tipoPregunta !== '') {
            opcion = tipoPregunta.split('_')[3];
            campoOpcion.setValue(opcion);
            subtipo = tipoPregunta.split('_')[4];
            campoSubtipo.setValue(subtipo);
          }
        }
      }
    }
    return tipoPregunta;
  }

  static onOpcionChange(activityForm: FormGroup, event: any, ultimaOpcion: string): string {
    const controlesPreguntas = UtilActivityQuestions.controlesPreguntas(activityForm);
    let campoPregunta;
    for (let i = 0; i < controlesPreguntas.length; i++) {
      campoPregunta = controlesPreguntas[i].get('tipoPregunta');
      if (campoPregunta) {
        campoPregunta.setValue(event.value);
      }

      if (
        event.value === OpcionConcatenada.PREG_TEXTO_RESP_UNICA_VERDADEROFALSO ||
        event.value === OpcionConcatenada.PREG_AUDIO_RESP_UNICA_VERDADEROFALSO
      ) {
        UtilActivityQuestions.verdaderoFalso(activityForm, i);
      } else {
        if (this.isMediaImage(event.value)) {
          UtilActivityQuestions.media(activityForm, i, this.isNotMediaImage(ultimaOpcion));
        }

        if (this.isMediaAudio(event.value)) {
          UtilActivityQuestions.media(activityForm, i, this.isNotMediaAudio(ultimaOpcion));
        }
      }

      if (
        ultimaOpcion === OpcionConcatenada.PREG_TEXTO_RESP_UNICA_VERDADEROFALSO ||
        ultimaOpcion === OpcionConcatenada.PREG_AUDIO_RESP_UNICA_VERDADEROFALSO
      ) {
        UtilActivityQuestions.vaciaActivaInputsBoolean(activityForm, i, this.isTextWithTrueFalse(event.value));
      } else {
        if (this.isMutimedia(ultimaOpcion) && this.isTextWithTrueFalse(event.value)) {
          UtilActivityQuestions.vaciaActivaInputs(activityForm, i);
        }
      }
      UtilActivityQuestions.onRadioChange(activityForm, i, 0);
    }
    return event.value;
  }

  static preguntas(activityForm: FormGroup): FormArray | undefined {
    if (activityForm) {
      return activityForm.get('preguntas') as FormArray;
    } else {
      return undefined;
    }
  }

  static respuestas(activityForm: FormGroup, indQuestion: number): FormArray | undefined {
    const preguntas = UtilActivityQuestions.preguntas(activityForm);
    if (preguntas) {
      return preguntas.controls[indQuestion].get('respuestas') as FormArray;
    } else {
      return undefined;
    }
  }

  static vaciaActivaInputs(activityForm: FormGroup, indQuestion: number): void {
    const cantidadRespuestas = UtilActivityQuestions.controlesRespuestas(activityForm, indQuestion).length;
    let respuesta;
    for (let i = 0; i < cantidadRespuestas; i++) {
      respuesta = UtilActivityQuestions.campoRespuesta(activityForm, indQuestion, i, 'respuesta');
      if (respuesta) {
        respuesta.setValue('');
        respuesta.enable();
      }
    }
    UtilActivityQuestions.refreshAnswers(activityForm);
  }

  static verdaderoFalso(activityForm: FormGroup, indQuestion: number): void {
    const controlesRespuestas = UtilActivityQuestions.controlesRespuestas(activityForm, indQuestion);
    const cantidadRespuestas = controlesRespuestas.length;
    if (cantidadRespuestas > 2) {
      const cantidadEliminar = cantidadRespuestas - 2;
      controlesRespuestas.splice(2, cantidadEliminar);
    } else if (cantidadRespuestas === 1) {
      controlesRespuestas.push(UtilActivityQuestions.formGroupVacioRespuesta(false));
    }
    const campoVerdadero = UtilActivityQuestions.campoRespuesta(activityForm, indQuestion, 0, 'respuesta');
    if (campoVerdadero) {
      campoVerdadero.setValue('verdadero');
      campoVerdadero.disable();
    }

    const campoFalso = UtilActivityQuestions.campoRespuesta(activityForm, indQuestion, 1, 'respuesta');
    if (campoFalso) {
      campoFalso.setValue('falso');
      campoFalso.disable();
    }
  }

  static vaciaActivaInputsBoolean(activityForm: FormGroup, indQuestion: number, activa: boolean): void {
    const campoVerdadero = UtilActivityQuestions.campoRespuesta(activityForm, indQuestion, 0, 'respuesta');
    if (campoVerdadero) {
      campoVerdadero.setValue('');
      if (activa) {
        campoVerdadero.enable();
      }
    }

    const campoFalso = UtilActivityQuestions.campoRespuesta(activityForm, indQuestion, 1, 'respuesta');
    if (campoFalso) {
      campoFalso.setValue('');
      if (activa) {
        campoFalso.enable();
      }
    }
  }

  static controlesPreguntas(activityForm: FormGroup): AbstractControl[] {
    const preguntas = UtilActivityQuestions.preguntas(activityForm);
    if (preguntas) {
      const controlesPreguntas = preguntas.controls;
      if (controlesPreguntas) {
        return controlesPreguntas;
      } else {
        return [];
      }
    } else {
      return [];
    }
  }

  static controlesRespuestas(activityForm: FormGroup, indQuestion: number): AbstractControl[] {
    const respuestas = UtilActivityQuestions.respuestas(activityForm, indQuestion);
    if (respuestas) {
      const controlesRespuestas = respuestas.controls;
      if (controlesRespuestas) {
        return controlesRespuestas;
      } else {
        return [];
      }
    } else {
      return [];
    }
  }

  static controlPregunta(activityForm: FormGroup, indQuestion: number): AbstractControl | null | undefined {
    const preguntas = UtilActivityQuestions.preguntas(activityForm);
    if (preguntas) {
      const controlesPreguntas = preguntas.controls;
      let controlPregunta;
      if (controlesPreguntas[indQuestion]) {
        controlPregunta = controlesPreguntas[indQuestion];
      }
      return controlPregunta;
    } else {
      return undefined;
    }
  }

  static controlRespuesta(activityForm: FormGroup, indQuestion: number, indAnswer: number): AbstractControl | null | undefined {
    let controlesRespuestas;
    let controlRespuesta;
    const respuestas = UtilActivityQuestions.respuestas(activityForm, indQuestion);
    if (respuestas) {
      controlesRespuestas = respuestas.controls;
      if (controlesRespuestas) {
        if (controlesRespuestas[indAnswer]) {
          controlRespuesta = controlesRespuestas[indAnswer];
        }
      }
      return controlRespuesta;
    } else {
      return undefined;
    }
  }

  static campoPregunta(activityForm: FormGroup, indQuestion: number, nombreCampo: string): AbstractControl | null | undefined {
    const controlPregunta = UtilActivityQuestions.controlPregunta(activityForm, indQuestion);
    let campo;
    if (controlPregunta) {
      campo = controlPregunta.get(nombreCampo);
    }
    return campo;
  }

  static campoRespuesta(
    activityForm: FormGroup,
    indQuestion: number,
    indAnswer: number,
    nombreCampo: string
  ): AbstractControl | null | undefined {
    const controlRespuesta = UtilActivityQuestions.controlRespuesta(activityForm, indQuestion, indAnswer);
    let campo;
    if (controlRespuesta) {
      campo = controlRespuesta.get(nombreCampo);
    }
    return campo;
  }

  static refreshQuestion(activityForm: FormGroup, indQuestion: number): void {
    const controlPregunta = UtilActivityQuestions.controlPregunta(activityForm, indQuestion);
    if (controlPregunta) {
      controlPregunta.updateValueAndValidity({ onlySelf: true, emitEvent: true });
    }
  }

  static refreshAnswersQuestion(activityForm: FormGroup, indQuestion: number): void {
    const respuestas = UtilActivityQuestions.respuestas(activityForm, indQuestion);
    if (respuestas) {
      respuestas.updateValueAndValidity({ onlySelf: true, emitEvent: true });
    }
  }

  static refreshAnswers(activityForm: FormGroup): void {
    const preguntas = UtilActivityQuestions.preguntas(activityForm);
    if (preguntas) {
      for (let i = 0; i < preguntas.length; i++) {
        preguntas.updateValueAndValidity({ onlySelf: true, emitEvent: true });
        UtilActivityQuestions.refreshQuestions(activityForm);
      }
    }
  }

  static refreshQuestions(activityForm: FormGroup): void {
    const preguntas = UtilActivityQuestions.preguntas(activityForm);
    if (preguntas) {
      preguntas.updateValueAndValidity({ onlySelf: true, emitEvent: true });
    }
  }

  static refreshForm(activityForm: FormGroup): void {
    let evaluable;
    UtilActivityQuestions.refreshAnswers(activityForm);
    if (activityForm) {
      evaluable = activityForm.get('evaluable');
      if (evaluable) {
        evaluable.updateValueAndValidity({ onlySelf: true, emitEvent: true });
      }
      activityForm.updateValueAndValidity({ onlySelf: true, emitEvent: true });
    }
  }

  static onRadioChange(activityForm: FormGroup, indQuestion: number, indAnswer: number): void {
    const cantidadRespuestas = UtilActivityQuestions.controlesRespuestas(activityForm, indQuestion).length;
    let respuestasPorNegar;
    let respuestaPorAfirmar;
    UtilActivityQuestions.refreshAnswers(activityForm);
    for (let i = 0; i < cantidadRespuestas; i++) {
      if (i !== indAnswer) {
        respuestasPorNegar = UtilActivityQuestions.campoRespuesta(activityForm, indQuestion, i, 'correcta');
        if (respuestasPorNegar) {
          respuestasPorNegar.setValue(false);
        }
      } else {
        respuestaPorAfirmar = UtilActivityQuestions.campoRespuesta(activityForm, indQuestion, i, 'correcta');
        if (respuestaPorAfirmar) {
          if (respuestaPorAfirmar.value === false) {
            respuestaPorAfirmar.setValue(true);
          }
          respuestaPorAfirmar.updateValueAndValidity({ onlySelf: true, emitEvent: true });
        }
      }
    }
    UtilActivityQuestions.refreshAnswers(activityForm);
  }

  static onKeyDown(event: any): boolean {
    if (event.key === 'Enter') {
      event.preventDefault();
      return false;
    } else {
      return true;
    }
  }

  static media(activityForm: FormGroup, indQuestion: number, emptyValue: boolean): void {
    const cantidadRespuestas = UtilActivityQuestions.controlesRespuestas(activityForm, indQuestion).length;
    let respuesta, safeUrl, path, loadedSafeUrl;
    for (let i = 0; i < cantidadRespuestas; i++) {
      respuesta = UtilActivityQuestions.campoRespuesta(activityForm, indQuestion, i, 'respuesta');
      safeUrl = UtilActivityQuestions.campoRespuesta(activityForm, indQuestion, i, 'safeUrl');
      path = UtilActivityQuestions.campoRespuesta(activityForm, indQuestion, i, 'path');
      loadedSafeUrl = UtilActivityQuestions.campoRespuesta(activityForm, indQuestion, i, 'loadedSafeUrl');
      if (respuesta && safeUrl && path && loadedSafeUrl) {
        if (emptyValue) {
          respuesta.setValue('');
          safeUrl.setValue('');
          path.setValue('');
          loadedSafeUrl.setValue('');
        }
        respuesta.disable();
      }
    }
    UtilActivityQuestions.refreshAnswers(activityForm);
  }

  static getImage(
    activityForm: FormGroup,
    path: string,
    indQuestion: number,
    indAnswer: number,
    fileUploadInteractivas: FileUploadInteractivasService,
    domSanitizer: DomSanitizer
  ): void {
    const campoSafeUrl = UtilActivityQuestions.campoRespuesta(activityForm, indQuestion, indAnswer, 'safeUrl');
    const loadedSafeUrl = UtilActivityQuestions.campoRespuesta(activityForm, indQuestion, indAnswer, 'loadedSafeUrl');
    if (campoSafeUrl && loadedSafeUrl && path !== '' && (campoSafeUrl.value == null || campoSafeUrl.value === '') && !loadedSafeUrl.value) {
      loadedSafeUrl.setValue(true);
      fileUploadInteractivas
        .getImage(path)
        .pipe()
        .subscribe((value: string) => {
          this.setCampoSafeUrl(campoSafeUrl, domSanitizer, value, indQuestion, activityForm);
        });
    }
  }

  static getAudio(
    activityForm: FormGroup,
    path: string,
    indQuestion: number,
    indAnswer: number,
    fileUploadInteractivas: FileUploadInteractivasService,
    domSanitizer: DomSanitizer
  ): void {
    const campoSafeUrl = UtilActivityQuestions.campoRespuesta(activityForm, indQuestion, indAnswer, 'safeUrl');
    const loadedSafeUrl = UtilActivityQuestions.campoRespuesta(activityForm, indQuestion, indAnswer, 'loadedSafeUrl');
    if (campoSafeUrl && loadedSafeUrl && path !== '' && (campoSafeUrl.value == null || campoSafeUrl.value === '') && !loadedSafeUrl.value) {
      loadedSafeUrl.setValue(true);
      fileUploadInteractivas
        .getSound(path)
        .pipe()
        .subscribe((value: string) => {
          this.setCampoSafeUrl(campoSafeUrl, domSanitizer, value, indQuestion, activityForm);
        });
    }
  }

  static getAudioQuestion(
    activityForm: FormGroup,
    path: string,
    indQuestion: number,
    fileUploadInteractivas: FileUploadInteractivasService,
    domSanitizer: DomSanitizer
  ): void {
    const campoSafeUrl = UtilActivityQuestions.campoPregunta(activityForm, indQuestion, 'safeUrl');
    const loadedSafeUrl = UtilActivityQuestions.campoPregunta(activityForm, indQuestion, 'loadedSafeUrl');
    if (campoSafeUrl && loadedSafeUrl && path !== '' && (campoSafeUrl.value == null || campoSafeUrl.value === '') && !loadedSafeUrl.value) {
      loadedSafeUrl.setValue(true);
      fileUploadInteractivas
        .getSound(path)
        .pipe()
        .subscribe((value: string) => {
          this.setCampoSafeUrl(campoSafeUrl, domSanitizer, value, indQuestion, activityForm);
        });
    }
  }

  static setCampoSafeUrl(
    campoSafeUrl: AbstractControl,
    domSanitizer: DomSanitizer,
    value: string,
    indQuestion: number,
    activityForm: FormGroup
  ): void {
    campoSafeUrl.setValue(domSanitizer.bypassSecurityTrustUrl(value));
    setTimeout(() => {
      const inputQuestion = document.getElementById('id_question' + indQuestion);
      if (inputQuestion) {
        inputQuestion.focus();
        // this.showLoader = false;
        this.refreshQuestion(activityForm, indQuestion);
        UtilActivityQuestions.refreshForm(activityForm);
      }
    }, 1000);
  }

  static isUnic(typeQuestion: string): boolean {
    return (
      typeQuestion === OpcionConcatenada.PREG_TEXTO_RESP_UNICA_TEXTO ||
      typeQuestion === OpcionConcatenada.PREG_TEXTO_RESP_UNICA_IMAGEN ||
      typeQuestion === OpcionConcatenada.PREG_TEXTO_RESP_UNICA_AUDIO ||
      typeQuestion === OpcionConcatenada.PREG_TEXTO_RESP_UNICA_VERDADEROFALSO ||
      typeQuestion === OpcionConcatenada.PREG_AUDIO_RESP_UNICA_TEXTO ||
      typeQuestion === OpcionConcatenada.PREG_AUDIO_RESP_UNICA_VERDADEROFALSO ||
      typeQuestion === OpcionConcatenada.PREG_AUDIO_RESP_UNICA_IMAGEN ||
      typeQuestion === OpcionConcatenada.PREG_AUDIO_RESP_UNICA_AUDIO
    );
  }

  static isMultiple(typeQuestion: string): boolean {
    return (
      typeQuestion === OpcionConcatenada.PREG_TEXTO_RESP_MULTIPLE_TEXTO ||
      typeQuestion === OpcionConcatenada.PREG_TEXTO_RESP_MULTIPLE_IMAGEN ||
      typeQuestion === OpcionConcatenada.PREG_TEXTO_RESP_MULTIPLE_AUDIO ||
      typeQuestion === OpcionConcatenada.PREG_AUDIO_RESP_MULTIPLE_TEXTO ||
      typeQuestion === OpcionConcatenada.PREG_AUDIO_RESP_MULTIPLE_IMAGEN ||
      typeQuestion === OpcionConcatenada.PREG_AUDIO_RESP_MULTIPLE_AUDIO
    );
  }

  static isVerdaderoFalso(typeQuestion: string): boolean {
    return (
      typeQuestion === OpcionConcatenada.PREG_TEXTO_RESP_UNICA_VERDADEROFALSO ||
      typeQuestion === OpcionConcatenada.PREG_AUDIO_RESP_UNICA_VERDADEROFALSO
    );
  }

  static isMutimedia(typeQuestion: string): boolean {
    return (
      typeQuestion === OpcionConcatenada.PREG_TEXTO_RESP_UNICA_IMAGEN ||
      typeQuestion === OpcionConcatenada.PREG_TEXTO_RESP_MULTIPLE_IMAGEN ||
      typeQuestion === OpcionConcatenada.PREG_TEXTO_RESP_UNICA_AUDIO ||
      typeQuestion === OpcionConcatenada.PREG_TEXTO_RESP_MULTIPLE_AUDIO ||
      typeQuestion === OpcionConcatenada.PREG_AUDIO_RESP_UNICA_IMAGEN ||
      typeQuestion === OpcionConcatenada.PREG_AUDIO_RESP_MULTIPLE_IMAGEN ||
      typeQuestion === OpcionConcatenada.PREG_AUDIO_RESP_UNICA_AUDIO ||
      typeQuestion === OpcionConcatenada.PREG_AUDIO_RESP_MULTIPLE_AUDIO
    );
  }

  static isMediaAudio(typeQuestion: string): boolean {
    return (
      typeQuestion === OpcionConcatenada.PREG_TEXTO_RESP_UNICA_AUDIO ||
      typeQuestion === OpcionConcatenada.PREG_TEXTO_RESP_MULTIPLE_AUDIO ||
      typeQuestion === OpcionConcatenada.PREG_AUDIO_RESP_UNICA_AUDIO ||
      typeQuestion === OpcionConcatenada.PREG_AUDIO_RESP_MULTIPLE_AUDIO
    );
  }

  static isNotMediaAudio(typeQuestion: string): boolean {
    return (
      typeQuestion !== OpcionConcatenada.PREG_TEXTO_RESP_UNICA_AUDIO &&
      typeQuestion !== OpcionConcatenada.PREG_TEXTO_RESP_MULTIPLE_AUDIO &&
      typeQuestion !== OpcionConcatenada.PREG_AUDIO_RESP_UNICA_AUDIO &&
      typeQuestion !== OpcionConcatenada.PREG_AUDIO_RESP_MULTIPLE_AUDIO
    );
  }

  static isMediaImage(typeQuestion: string): boolean {
    return (
      typeQuestion === OpcionConcatenada.PREG_TEXTO_RESP_UNICA_IMAGEN ||
      typeQuestion === OpcionConcatenada.PREG_TEXTO_RESP_MULTIPLE_IMAGEN ||
      typeQuestion === OpcionConcatenada.PREG_AUDIO_RESP_UNICA_IMAGEN ||
      typeQuestion === OpcionConcatenada.PREG_AUDIO_RESP_MULTIPLE_IMAGEN
    );
  }

  static isNotMediaImage(typeQuestion: string): boolean {
    return (
      typeQuestion !== OpcionConcatenada.PREG_TEXTO_RESP_UNICA_IMAGEN &&
      typeQuestion !== OpcionConcatenada.PREG_TEXTO_RESP_MULTIPLE_IMAGEN &&
      typeQuestion !== OpcionConcatenada.PREG_AUDIO_RESP_UNICA_IMAGEN &&
      typeQuestion !== OpcionConcatenada.PREG_AUDIO_RESP_MULTIPLE_IMAGEN
    );
  }

  static isQuestionText(typeQuestion: string): boolean {
    return (
      typeQuestion === OpcionConcatenada.PREG_TEXTO_RESP_UNICA_TEXTO ||
      typeQuestion === OpcionConcatenada.PREG_TEXTO_RESP_MULTIPLE_TEXTO ||
      typeQuestion === OpcionConcatenada.PREG_TEXTO_RESP_UNICA_VERDADEROFALSO ||
      typeQuestion === OpcionConcatenada.PREG_TEXTO_RESP_UNICA_IMAGEN ||
      typeQuestion === OpcionConcatenada.PREG_TEXTO_RESP_MULTIPLE_IMAGEN ||
      typeQuestion === OpcionConcatenada.PREG_TEXTO_RESP_UNICA_AUDIO ||
      typeQuestion === OpcionConcatenada.PREG_TEXTO_RESP_MULTIPLE_AUDIO
    );
  }

  static isTextWithTrueFalse(typeQuestion: string): boolean {
    return (
      typeQuestion !== OpcionConcatenada.PREG_TEXTO_RESP_UNICA_IMAGEN &&
      typeQuestion !== OpcionConcatenada.PREG_TEXTO_RESP_MULTIPLE_IMAGEN &&
      typeQuestion !== OpcionConcatenada.PREG_TEXTO_RESP_UNICA_VERDADEROFALSO &&
      typeQuestion !== OpcionConcatenada.PREG_AUDIO_RESP_UNICA_VERDADEROFALSO &&
      typeQuestion !== OpcionConcatenada.PREG_TEXTO_RESP_UNICA_AUDIO &&
      typeQuestion !== OpcionConcatenada.PREG_TEXTO_RESP_MULTIPLE_AUDIO
    );
  }

  static isQuestionAudio(typeQuestion: string): boolean {
    return (
      typeQuestion === OpcionConcatenada.PREG_AUDIO_RESP_UNICA_TEXTO ||
      typeQuestion === OpcionConcatenada.PREG_AUDIO_RESP_MULTIPLE_TEXTO ||
      typeQuestion === OpcionConcatenada.PREG_AUDIO_RESP_UNICA_VERDADEROFALSO ||
      typeQuestion === OpcionConcatenada.PREG_AUDIO_RESP_UNICA_IMAGEN ||
      typeQuestion === OpcionConcatenada.PREG_AUDIO_RESP_MULTIPLE_IMAGEN ||
      typeQuestion === OpcionConcatenada.PREG_AUDIO_RESP_UNICA_AUDIO ||
      typeQuestion === OpcionConcatenada.PREG_AUDIO_RESP_MULTIPLE_AUDIO
    );
  }

  static isAnswersText(typeQuestion: string): boolean {
    return (
      typeQuestion === OpcionConcatenada.PREG_TEXTO_RESP_UNICA_TEXTO ||
      typeQuestion === OpcionConcatenada.PREG_TEXTO_RESP_MULTIPLE_TEXTO ||
      typeQuestion === OpcionConcatenada.PREG_TEXTO_RESP_UNICA_VERDADEROFALSO ||
      typeQuestion === OpcionConcatenada.PREG_AUDIO_RESP_UNICA_TEXTO ||
      typeQuestion === OpcionConcatenada.PREG_AUDIO_RESP_MULTIPLE_TEXTO ||
      typeQuestion === OpcionConcatenada.PREG_AUDIO_RESP_UNICA_VERDADEROFALSO
    );
  }
}
