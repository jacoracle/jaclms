import { Injectable } from '@angular/core';
import { IActividadInteractiva } from 'app/shared/model/actividad-interactiva.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { QuestionComponent } from 'app/constructor/interactive-activities/question/question.component';
import { MatchingComponent } from 'app/constructor/interactive-activities/matching/matching.component';

@Injectable({
  providedIn: 'root'
})
export class ActivityModalService {
  isOpen = false;

  constructor(private modalService: NgbModal) {}

  open(activity: IActividadInteractiva, id: number): void {
    let modalRef;
    if (!this.isOpen) {
      this.isOpen = true;
      if (activity.tipoActividadInteractiva && activity.tipoActividadInteractiva.tipoActividad) {
        switch (activity.tipoActividadInteractiva.tipoActividad) {
          case 'pregunta_texto': {
            modalRef = this.modalService.open(QuestionComponent);
            break;
          }
          case 'relacionar_columnas': {
            modalRef = this.modalService.open(MatchingComponent);
            break;
          }
        }
        if (modalRef) {
          modalRef.componentInstance.activity = activity;
          modalRef.componentInstance.id = id;
          modalRef.result.finally(() => {
            this.isOpen = false;
          });
        }
      }
    }
  }
}
