import { Component, OnInit, Input } from '@angular/core';
import { NavigationControlsService } from '../../services/navigation-controls.service';
import { ContentBlocksService } from 'app/services/content-blocks.service';
import { TipoComponenteService } from 'app/entities/tipo-bloque-componente/tipo-componente.service';
import { ITipoBloqueComponentes } from 'app/shared/model/tipo-bloque-componentes.model';
import { map } from 'rxjs/operators';
import { HttpResponse } from '@angular/common/http';
import { TextEditorBehaviorService } from 'app/services/text-editor-behavior.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'jhi-template-gallery',
  templateUrl: './template-gallery.component.html',
  styleUrls: ['./template-gallery.component.scss']
})
export class TemplateGalleryComponent implements OnInit {
  selectedContentBlockIndex = -1;
  filters: any;
  private _templates: ITipoBloqueComponentes[] = [];
  get templates(): ITipoBloqueComponentes[] {
    return this._templates;
  }
  @Input()
  set templates(val: ITipoBloqueComponentes[]) {
    this._templates = val;
  }

  filteredTemplates: ITipoBloqueComponentes[] = [];

  constructor(
    private contentBlocksService: ContentBlocksService,
    private navigationControlsService: NavigationControlsService,
    private tipoComponenteService: TipoComponenteService,
    private textEditorBehaviosService: TextEditorBehaviorService,
    private translate: TranslateService
  ) {
    this.filters = [
      {
        text: translate.instant('rightbar.all'),
        filter: 'all',
        selected: true
      },
      {
        text: translate.instant('rightbar.text'),
        filter: 'text',
        selected: false
      },
      {
        text: translate.instant('rightbar.multimedia'),
        filter: 'media',
        selected: false
      }
    ];
    // Obtener las plantillas del llamdo de los tipos de bloques de contenido
    this.tipoComponenteService
      .query()
      .pipe(
        map((res: HttpResponse<ITipoBloqueComponentes[]>) => {
          return res.body ? res.body : [];
        })
      )
      .subscribe((resBody: ITipoBloqueComponentes[]) => {
        this.templates = resBody;
        // Enviar plantillas a servicio para utilizar en filmStrip
        this.contentBlocksService.setTemplates(this.templates);
        this.filteredTemplates = this.templates;
      });
  }

  ngOnInit(): void {}

  selectContentBlock(selectedContentBlockIndex: number): void {
    this.textEditorBehaviosService.setShowTextEditor(false);
    this.selectedContentBlockIndex = selectedContentBlockIndex;
    this.contentBlocksService.setSelectedBlock(this.filteredTemplates[selectedContentBlockIndex]);
    this.navigationControlsService.setOpenTemplateGallery(false);
  }

  filterTemplates(filter: any): void {
    this.restoreSelectedFilters();
    filter.selected = true;
    this.filteredTemplates = [];
    for (let i = 0; i < this.templates.length; i++) {
      if (this.templates[i].tags!.includes(filter.filter)) {
        this.filteredTemplates.push(this.templates[i]);
      }
    }
  }

  restoreSelectedFilters(): void {
    for (let i = 0; i < this.filters.length; i++) {
      this.filters[i].selected = false;
    }
  }
}
