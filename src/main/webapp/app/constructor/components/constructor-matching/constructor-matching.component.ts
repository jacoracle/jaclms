import { Component, Input, OnDestroy } from '@angular/core';
import { Componente } from 'app/shared/model/componente.model';
import { SafeUrl } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { ActivityService } from 'app/services/activity.service';

@Component({
  selector: 'jhi-constructor-matching',
  templateUrl: './constructor-matching.component.html',
  styleUrls: ['./constructor-matching.component.scss']
})
export class ConstructorMatchingComponent implements OnDestroy {
  emptyActivityImg: SafeUrl = './../../../../content/images/actividad.png';
  activityImg: SafeUrl = './../../../../content/images/actividad.png';
  subscription: Subscription;
  editing = false;

  _component?: Componente;
  @Input()
  set component(val: Componente) {
    this._component = val;
    this._component.actividadesInteractivas![0].tipoActividadInteractiva = {
      opcion: 'unica',
      subtipo: 'texto',
      tipoActividad: 'relacionar_columnas'
    };
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

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
