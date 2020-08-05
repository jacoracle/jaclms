import { Component, ViewChild } from '@angular/core';
import { ModuloUpdateComponent } from 'app/entities/modulo/modulo-update.component';

@Component({
  selector: 'jhi-module-configuration',
  templateUrl: './module-configuration.component.html',
  styleUrls: ['./module-configuration.component.scss']
})
export class ModuleConfigurationComponent {
  @ViewChild(ModuloUpdateComponent, { static: false }) moduloUpdateComponent!: ModuloUpdateComponent;
  subscription: any;
  firstClick = false;

  constructor() {}

  saveUMA(): void {
    this.moduloUpdateComponent.save();
    this.firstClick = this.moduloUpdateComponent.firstClick;
  }
}
