import { ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { OpcionPreguntas, SubTipoActividad, TipoActividad } from 'app/shared/model/enumerations/tipo-actividad.model';
import { JhiEventManager, JhiEventWithContent } from 'ng-jhipster';
import { IActividadPregunta } from 'app/shared/model/actividad-pregunta.model';
import { cantidadAtributos } from 'app/shared/util/util';
import UtilActivityQuestions from 'app/shared/activity-questions-preview/util-activity-questions';

@Component({
  selector: 'jhi-activity-form-text-modal',
  templateUrl: './activity-form-text-modal.component.html',
  styleUrls: ['./activity-form-text-modal.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ActivityFormTextModalComponent implements OnInit {
  submitted = false;
  id = 0;
  jsonFormIn: IActividadPregunta | undefined;
  typeActivityQuestions = '';
  activityForm = this.formGroupActivity(this.jsonFormIn);
  ultimaOpcion = '';

  constructor(public activeModal: NgbActiveModal, private formBuilder: FormBuilder, private eventManager: JhiEventManager) {}

  ngOnInit(): void {
    if (this.jsonFormIn) {
      this.activityForm = this.formGroupActivity(this.jsonFormIn);
      UtilActivityQuestions.refreshForm(this.activityForm);
    }
  }

  formGroupActivity(jsonForm: IActividadPregunta | undefined): FormGroup {
    if (jsonForm && cantidadAtributos(jsonForm) > 0) {
      if (jsonForm.tipoActividad.opcion != null) {
        this.ultimaOpcion = jsonForm.tipoActividad.opcion;
      }
      return this.formBuilder.group({
        tipoActividad: this.formBuilder.group({
          tipoActividad: new FormControl(jsonForm.tipoActividad.tipoActividad, [Validators.required]),
          subtipo: new FormControl(jsonForm.tipoActividad.subtipo, [Validators.required]),
          opcion: new FormControl(jsonForm.tipoActividad.opcion, [Validators.required])
        }),
        evaluable: new FormControl(jsonForm.evaluable, [Validators.required]),
        preguntas: UtilActivityQuestions.arrayFormGroupPreguntas(jsonForm, this.formBuilder)
      });
    } else {
      return this.formBuilder.group({
        tipoActividad: this.formBuilder.group({
          tipoActividad: new FormControl(TipoActividad.pregunta, [Validators.required]),
          subtipo: new FormControl(SubTipoActividad.texto, [Validators.required]),
          opcion: new FormControl(OpcionPreguntas.unica, [Validators.required])
        }),
        evaluable: new FormControl(false, [Validators.required]),
        preguntas: UtilActivityQuestions.arrayFormGroupPreguntas(jsonForm, this.formBuilder)
      });
    }
  }

  typeQuestion(): string {
    return UtilActivityQuestions.typeQuestion(this.activityForm);
  }

  onOpcionChange(event: any): void {
    this.ultimaOpcion = UtilActivityQuestions.onOpcionChange(this.activityForm, event, this.ultimaOpcion);
  }

  onRadioChange(indQuestion: number, indAnswer: number): void {
    UtilActivityQuestions.onRadioChange(this.activityForm, indQuestion, indAnswer);
  }

  onSubmit(): any {
    this.submitted = true;
    UtilActivityQuestions.refreshForm(this.activityForm);
    if (this.activityForm.invalid) {
      this.eventManager.broadcast(
        new JhiEventWithContent('constructorApp.validationError', {
          message: 'constructorApp.activityForm.invalidForm.error',
          type: 'danger'
        })
      );
    } else {
      this.activeModal.close(this.activityForm.getRawValue());
      this.eventManager.broadcast(
        new JhiEventWithContent('constructorApp.validationError', {
          message: 'constructorApp.activityForm.closeModal.success',
          type: 'info'
        })
      );
    }
  }

  close(): any {
    this.activeModal.close();
  }

  onKeyDown(event: any): boolean {
    return UtilActivityQuestions.onKeyDown(event);
  }

  isMediaImage(typeQuestion: string): boolean {
    return UtilActivityQuestions.isMediaImage(typeQuestion);
  }

  isMediaAudio(typeQuestion: string): boolean {
    return UtilActivityQuestions.isMediaAudio(typeQuestion);
  }

  isMutimedia(typeQuestion: string): boolean {
    return UtilActivityQuestions.isMutimedia(typeQuestion);
  }
}
