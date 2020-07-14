import { Component, Input, ViewEncapsulation } from '@angular/core';
import { TextService } from 'app/services/text.service';
import { ITipoBloqueComponentes } from 'app/shared/model/tipo-bloque-componentes.model';
import { ContentBlocksService } from 'app/services/content-blocks.service';
import Quill from 'quill';

@Component({
  selector: 'jhi-constructor-text',
  templateUrl: './constructor-text.component.html',
  styleUrls: ['./constructor-text.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ConstructorTextComponent {
  editor: any;

  // htmlContent: any;
  placeholder =
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.";
  private _htmlContent = '';
  isTitle = false;
  templates: ITipoBloqueComponentes[] = [];
  headingSelect: any;

  constructor(private textService: TextService, private contentBlocksService: ContentBlocksService) {
    const Font = Quill.import('attributors/class/font');
    Font.whitelist = ['arial', 'times-new-roman', 'calibri', 'comic-sans-ms'];
    Quill.register(Font, true);

    this.contentBlocksService.getTempaltes().subscribe(templates => {
      this.templates = templates;
    });
    this.textService.getText().subscribe(text => {
      this._htmlContent = text;
    });
    this.textService.getTemplateType().subscribe(templateTypeId => {
      this.isTitle = templateTypeId.nombre === 'titulo';
    });
  }

  afterCreated(quill: Quill): void {
    this.editor = quill;
  }

  get htmlContent(): string {
    if (this.isTitle && this.headingSelect === undefined) {
      this.editor.setSelection(this._htmlContent.length, 0);
      return '<h1>' + this.restoreTitle(this._htmlContent.replace(/\s/g, '&nbsp;'));
    } else {
      return this._htmlContent;
    }
  }

  @Input()
  set htmlContent(val: string) {
    this._htmlContent = val;
    this.textService.setText(val);
  }

  restoreTitle(text: string): string {
    if ((text.startsWith('<p>') && text.endsWith('</p>')) || text.startsWith('<h1>') || text.startsWith('<h1><h1>')) {
      return text.replace(/<[^>]*>/g, '') + '</h1>';
    }
    return text;
  }
}
