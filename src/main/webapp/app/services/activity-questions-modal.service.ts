import { Injectable } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ActivityFormTextModalComponent } from 'app/shared/activity-questions-preview/form-text/activity-form-text-modal.component';
import { IActividadPregunta } from 'app/shared/model/actividad-pregunta.model';
import { ActivityFormMediaModalComponent } from 'app/shared/activity-questions-preview/form-media/activity-form-media-modal.component';
import { ActivityFormAudioTextModalComponent } from 'app/shared/activity-questions-preview/form-audio-text/activity-form-audio-text-modal.component';
import { ActivityFormAudioMediaModalComponent } from 'app/shared/activity-questions-preview/form-audio-media/activity-form-audio-media-modal.component';

@Injectable({ providedIn: 'root' })
export class ActivityQuestionsModalService {
  isOpen = false;

  constructor(private modalService: NgbModal) {}

  // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
  // @ts-ignore
  open(id: number, jsonForm: IActividadPregunta | undefined, typeActivityQuestions: string): NgbModalRef {
    let modalRef;
    if (!this.isOpen) {
      this.isOpen = true;
      if (typeActivityQuestions) {
        switch (typeActivityQuestions) {
          case 'activity_question_text':
            modalRef = this.modalService.open(ActivityFormTextModalComponent);
            break;
          case 'activity_question_media':
            modalRef = this.modalService.open(ActivityFormMediaModalComponent);
            break;
          case 'activity_question_audio_text':
            modalRef = this.modalService.open(ActivityFormAudioTextModalComponent);
            break;
          case 'activity_question_audio_media':
            modalRef = this.modalService.open(ActivityFormAudioMediaModalComponent);
            break;
          default:
            modalRef = this.modalService.open(ActivityFormTextModalComponent);
            break;
        }
        modalRef.componentInstance.typeActivityQuestions = typeActivityQuestions;
        modalRef.componentInstance.id = id;
        modalRef.componentInstance.jsonFormIn = jsonForm;
        modalRef.result.finally(() => {
          this.isOpen = false;
        });
        return modalRef;
      }
    }
  }
}
