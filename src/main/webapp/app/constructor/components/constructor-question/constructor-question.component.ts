import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Componente } from 'app/shared/model/componente.model';
import { SafeUrl } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { ActivityService } from 'app/services/activity.service';

@Component({
  selector: 'jhi-constructor-question',
  templateUrl: './constructor-question.component.html',
  styleUrls: ['./constructor-question.component.scss']
})
export class ConstructorQuestionComponent implements OnInit, OnDestroy {
  emptyActivityImg: SafeUrl = './../../../../content/images/img_layout3.png';
  activityImg: SafeUrl = './../../../../content/images/img_layout3.png';
  subscription: Subscription;
  editing = false;

  _component?: Componente;
  @Input()
  set component(val: Componente) {
    this._component = val;
    this._component.actividadesInteractivas![0].tipoActividadInteractiva = {
      opcion: 'unica',
      subtipo: 'texto',
      tipoActividad: 'pregunta_texto'
    };
    console.error(val);
  }
  get component(): Componente {
    return this._component!;
  }
  constructor(private activitiService: ActivityService) {
    this.subscription = this.activitiService.getEditing().subscribe(editing => (this.editing = editing));
    this.subscription = this.activitiService.getActivity().subscribe(activity => {
      if (this.editing) {
        this.component.actividadesInteractivas![0] = activity;
      }
    });
  }

  selectActivity(): void {
    this.activitiService.setEditing(false);
    this.activitiService.setActivity(this.component.actividadesInteractivas![0]);
    this.editing = true;
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
