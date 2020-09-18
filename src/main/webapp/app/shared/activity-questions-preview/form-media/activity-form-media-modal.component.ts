import { ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { OpcionPreguntas, SubTipoActividad, TipoActividad } from 'app/shared/model/enumerations/tipo-actividad.model';
import { JhiEventManager, JhiEventWithContent } from 'ng-jhipster';
import { IActividadPregunta } from 'app/shared/model/actividad-pregunta.model';
import { cantidadAtributos } from 'app/shared/util/util';
import UtilActivityQuestions from 'app/shared/activity-questions-preview/util-activity-questions';
import { FileUploadInteractivasService } from 'app/services/file-upload-interactivas.service';

@Component({
  selector: 'jhi-activity-form-media-modal',
  templateUrl: './activity-form-media-modal.component.html',
  styleUrls: ['./activity-form-media-modal.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ActivityFormMediaModalComponent implements OnInit {
  submitted = false;
  id = 0;
  jsonFormIn: IActividadPregunta | undefined;
  activityForm = this.formGroupActivity(this.jsonFormIn);
  typeActivityQuestions = '';
  ultimaOpcion = '';
  filesAnswersDelete = [];

  constructor(
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private eventManager: JhiEventManager,
    public fileUploadInteractivas: FileUploadInteractivasService
  ) {}

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
          subtipo: new FormControl(SubTipoActividad.imagen, [Validators.required]),
          opcion: new FormControl(SubTipoActividad.imagen + '_' + OpcionPreguntas.unica, [Validators.required])
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
      this.fileUploadInteractivas.deleteFiles(this.filesAnswersDelete).subscribe(() => {});
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
