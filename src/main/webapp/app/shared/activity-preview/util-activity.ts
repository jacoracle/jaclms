import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { OpcionPreguntas } from 'app/shared/model/enumerations/tipo-actividad.model';
import { IActividadPregunta } from 'app/shared/model/actividad-pregunta.model';
import { cantidadAtributos } from 'app/shared/util/util';

export default class UtilActivity {
  static arrayFormGroupPreguntas(jsonForm: IActividadPregunta | undefined, formBuilder: FormBuilder): FormArray {
    const preguntas = formBuilder.array([]);
    if (jsonForm && cantidadAtributos(jsonForm) > 0) {
      for (let i = 0; i < jsonForm.preguntas.length; i++) {
        preguntas.push(
          new FormGroup({
            pregunta: new FormControl(jsonForm.preguntas[i].pregunta, [Validators.required, Validators.maxLength(50)]),
            tipoPregunta: new FormControl(jsonForm.preguntas[i].tipoPregunta, [Validators.required]),
            respuestas: UtilActivity.arrayFormGroupRespuestas(jsonForm, i, formBuilder),
            calificada: new FormControl(jsonForm.preguntas[i].calificada, [Validators.required]),
            marcada: new FormControl(jsonForm.preguntas[i].marcada, [Validators.required]),
            correcta: new FormControl(jsonForm.preguntas[i].correcta, [Validators.required])
          })
        );
      }
    } else {
      preguntas.push(UtilActivity.formGroupVacioPregunta(formBuilder));
    }
    return preguntas;
  }

  static formGroupVacioPregunta(formBuilder: FormBuilder): FormGroup {
    return new FormGroup({
      pregunta: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      tipoPregunta: new FormControl(OpcionPreguntas.unica, [Validators.required]),
      respuestas: UtilActivity.arrayFormGroupRespuestas(undefined, 0, formBuilder),
      calificada: new FormControl(false, [Validators.required]),
      marcada: new FormControl(false, [Validators.required]),
      correcta: new FormControl(false, [Validators.required])
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
                  disabled: jsonForm.tipoActividad.opcion === 'verdaderoFalso'
                },
                [Validators.required, Validators.maxLength(50)]
              ),
              correcta: new FormControl(respuestasJson[i].correcta, [Validators.required]),
              seleccionada: new FormControl(respuestasJson[i].seleccionada, [Validators.required])
            })
          );
        }
      }
    } else {
      respuestas.push(UtilActivity.formGroupVacioRespuesta(true));
    }
    return respuestas;
  }

  static formGroupVacioRespuesta(esPrimer: boolean): FormGroup {
    return new FormGroup({
      respuesta: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      correcta: new FormControl(esPrimer, [Validators.required]),
      seleccionada: new FormControl(false, [Validators.required])
    });
  }

  static preguntas(activityForm: FormGroup): FormArray | undefined {
    if (activityForm) {
      return activityForm.get('preguntas') as FormArray;
    } else {
      return undefined;
    }
  }

  static respuestas(activityForm: FormGroup, indQuestion: number): FormArray | undefined {
    const preguntas = UtilActivity.preguntas(activityForm);
    if (preguntas) {
      return preguntas.controls[indQuestion].get('respuestas') as FormArray;
    } else {
      return undefined;
    }
  }

  static verdaderoFalso(activityForm: FormGroup, indQuestion: number): void {
    const controlesRespuestas = UtilActivity.controlesRespuestas(activityForm, indQuestion);
    const cantidadRespuestas = controlesRespuestas.length;
    if (cantidadRespuestas > 2) {
      const cantidadEliminar = cantidadRespuestas - 2;
      controlesRespuestas.splice(2, cantidadEliminar);
    } else if (cantidadRespuestas === 1) {
      controlesRespuestas.push(UtilActivity.formGroupVacioRespuesta(false));
    }
    const campoVerdadero = UtilActivity.campoRespuesta(activityForm, indQuestion, 0, 'respuesta');
    if (campoVerdadero) {
      campoVerdadero.setValue('verdadero');
      campoVerdadero.disable();
    }

    const campoFalso = UtilActivity.campoRespuesta(activityForm, indQuestion, 1, 'respuesta');
    if (campoFalso) {
      campoFalso.setValue('falso');
      campoFalso.disable();
    }
  }

  static controlesPreguntas(activityForm: FormGroup): AbstractControl[] {
    const preguntas = UtilActivity.preguntas(activityForm);
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
    const respuestas = UtilActivity.respuestas(activityForm, indQuestion);
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
    const preguntas = UtilActivity.preguntas(activityForm);
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
    const respuestas = UtilActivity.respuestas(activityForm, indQuestion);
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

  static campoRespuesta(
    activityForm: FormGroup,
    indQuestion: number,
    indAnswer: number,
    nombreCampo: string
  ): AbstractControl | null | undefined {
    const controlRespuesta = UtilActivity.controlRespuesta(activityForm, indQuestion, indAnswer);
    let campo;
    if (controlRespuesta) {
      campo = controlRespuesta.get(nombreCampo);
    }
    return campo;
  }

  static refreshQuestion(activityForm: FormGroup, indQuestion: number): void {
    const controlPregunta = UtilActivity.controlPregunta(activityForm, indQuestion);
    if (controlPregunta) {
      controlPregunta.updateValueAndValidity({ onlySelf: true, emitEvent: true });
    }
  }

  static refreshAnswersQuestion(activityForm: FormGroup, indQuestion: number): void {
    const respuestas = UtilActivity.respuestas(activityForm, indQuestion);
    if (respuestas) {
      respuestas.updateValueAndValidity({ onlySelf: true, emitEvent: true });
    }
  }

  static refreshAnswers(activityForm: FormGroup): void {
    const preguntas = UtilActivity.preguntas(activityForm);
    if (preguntas) {
      for (let i = 0; i < preguntas.length; i++) {
        preguntas.updateValueAndValidity({ onlySelf: true, emitEvent: true });
        UtilActivity.refreshQuestions(activityForm);
      }
    }
  }

  static refreshQuestions(activityForm: FormGroup): void {
    const preguntas = UtilActivity.preguntas(activityForm);
    if (preguntas) {
      preguntas.updateValueAndValidity({ onlySelf: true, emitEvent: true });
    }
  }

  static refreshForm(activityForm: FormGroup): void {
    let evaluable;
    UtilActivity.refreshAnswers(activityForm);
    if (activityForm) {
      evaluable = activityForm.get('evaluable');
      if (evaluable) {
        evaluable.updateValueAndValidity({ onlySelf: true, emitEvent: true });
      }
      activityForm.updateValueAndValidity({ onlySelf: true, emitEvent: true });
    }
  }

  static onRadioChange(activityForm: FormGroup, indQuestion: number, indAnswer: number): void {
    const cantidadRespuestas = UtilActivity.controlesRespuestas(activityForm, indQuestion).length;
    let respuestasPorNegar;
    let respuestaPorAfirmar;
    UtilActivity.refreshAnswers(activityForm);
    for (let i = 0; i < cantidadRespuestas; i++) {
      if (i !== indAnswer) {
        respuestasPorNegar = UtilActivity.campoRespuesta(activityForm, indQuestion, i, 'correcta');
        if (respuestasPorNegar) {
          respuestasPorNegar.setValue(false);
        }
      } else {
        respuestaPorAfirmar = UtilActivity.campoRespuesta(activityForm, indQuestion, i, 'correcta');
        if (respuestaPorAfirmar) {
          if (respuestaPorAfirmar.value === false) {
            respuestaPorAfirmar.setValue(true);
          }
          respuestaPorAfirmar.updateValueAndValidity({ onlySelf: true, emitEvent: true });
        }
      }
    }
    UtilActivity.refreshAnswers(activityForm);
  }
}
