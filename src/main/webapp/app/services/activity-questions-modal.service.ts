import { Injectable } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ActivityFormTextModalComponent } from 'app/shared/activity-questions-preview/form-text/activity-form-text-modal.component';
import { IActividadPregunta } from 'app/shared/model/actividad-pregunta.model';
import { ActivityFormMediaModalComponent } from 'app/shared/activity-questions-preview/form-media/activity-form-media-modal.component';

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
      if (typeActivityQuestions && typeActivityQuestions === 'activity_question_text') {
        modalRef = this.modalService.open(ActivityFormTextModalComponent);
      } else {
        modalRef = this.modalService.open(ActivityFormMediaModalComponent);
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
