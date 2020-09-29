import { Injectable } from '@angular/core';
import { IActividadInteractiva } from 'app/shared/model/actividad-interactiva.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { QuestionComponent } from 'app/constructor/interactive-activities/question/question.component';

@Injectable({
  providedIn: 'root'
})
export class ActivityModalService {
  isOpen = false;

  constructor(private modalService: NgbModal) {}

  open(activity: IActividadInteractiva, id: number): void {
    console.error(activity);
    let modalRef;
    if (!this.isOpen) {
      this.isOpen = true;
      if (activity.tipoActividadInteractiva && activity.tipoActividadInteractiva.tipoActividad === 'pregunta_texto') {
        modalRef = this.modalService.open(QuestionComponent);
      } else {
        modalRef = this.modalService.open(QuestionComponent);
      }
      modalRef.componentInstance.activity = activity;
      modalRef.componentInstance.id = id;
      modalRef.result.finally(() => {
        this.isOpen = false;
      });
    }
  }
}
