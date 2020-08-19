import { Injectable } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ActivityModalComponent } from 'app/shared/activity-preview/activity-modal.component';
import { IActividadPregunta } from 'app/shared/model/actividad-pregunta.model';

@Injectable({ providedIn: 'root' })
export class ActivityModalService {
  isOpen = false;

  constructor(private modalService: NgbModal) {}

  // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
  // @ts-ignore
  open(jsonForm: IActividadPregunta | undefined): NgbModalRef {
    let modalRef;
    if (!this.isOpen) {
      this.isOpen = true;
      modalRef = this.modalService.open(ActivityModalComponent);
      modalRef.componentInstance.jsonFormIn = jsonForm;
      modalRef.result.finally(() => {
        this.isOpen = false;
      });
      return modalRef;
    }
  }
}
