import { Component, ViewChild } from '@angular/core';
import { ModuloUpdateComponent } from 'app/entities/modulo/modulo-update.component';
import { ActivatedRoute } from '@angular/router';
import { ModuloService } from 'app/entities/modulo/modulo.service';

@Component({
  selector: 'jhi-module-configuration',
  templateUrl: './module-configuration.component.html',
  styleUrls: ['./module-configuration.component.scss']
})
export class ModuleConfigurationComponent {
  @ViewChild(ModuloUpdateComponent, { static: false }) moduloUpdateComponent!: ModuloUpdateComponent;
  subscription: any;
  firstClick = false;
  modulo: any;
  id: number;

  constructor(private route: ActivatedRoute, private moduloService: ModuloService) {
    this.id = this.route.snapshot.paramMap.get('id') as any;
    if (this.id) {
      this.moduloService.find(this.id).subscribe(response => {
        this.modulo = response.body;
      });
    }
  }

  saveUMA(): void {
    this.moduloUpdateComponent.save();
    this.firstClick = this.moduloUpdateComponent.firstClick;
  }
}
