import { Component, ViewChild } from '@angular/core';
import { ModuloUpdateComponent } from 'app/entities/modulo/modulo-update.component';
import { ActivatedRoute, Router } from '@angular/router';
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
  since: string;

  constructor(private route: ActivatedRoute, private moduloService: ModuloService, private router: Router) {
    this.id = this.route.snapshot.paramMap.get('id') as any;
    this.since = this.route.snapshot.paramMap.get('since') as any;

    if (this.id) {
      this.moduloService.find(this.id).subscribe(response => {
        this.modulo = response.body;
      });
    }
  }

  saveUMA(): void {
    this.moduloUpdateComponent.save(this.since);
    this.firstClick = this.moduloUpdateComponent.firstClick;
  }

  cancelUMA(): void {
    if (this.since !== '' && this.since === 'book' && this.modulo) {
      this.router.navigate(['/constructor-layout', this.modulo.id, 'module']).then(r => {
        return r;
      });
    } else if (this.since !== '' && this.since === 'home' && this.modulo) {
      this.router.navigate(['/uma-home']).then(r => {
        return r;
      });
    } else {
      this.router.navigate(['/uma-groups-home']).then(r => {
        return r;
      });
    }
  }
}
