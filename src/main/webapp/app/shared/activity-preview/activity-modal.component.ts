import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'jhi-activity-modal',
  templateUrl: './activity-modal.component.html',
  styleUrls: ['./activity-modal.component.scss']
})
export class ActivityModalComponent {
  /* videoSrc: any;*/
  activityForm = this.formBuilder.group({
    id: [],
    question: ['?', [Validators.required, Validators.maxLength(50)]],
    question2: ['?', [Validators.required, Validators.maxLength(50)]]
  });

  constructor(public activeModal: NgbActiveModal, private formBuilder: FormBuilder) {}

  isValid(controlName: string): boolean {
    return this.activityForm.controls[controlName].status === 'VALID';
  }

  makeInvalid(controlName: string): void {
    this.activityForm.controls[controlName].setErrors(new Error());
  }
}
