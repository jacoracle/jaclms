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
  private _htmlContent = '';
  editor: any;
  placeholder =
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.";
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
      if (
        this._htmlContent !== undefined &&
        this._htmlContent !== '' &&
        this._htmlContent !== null &&
        this._htmlContent !== '<h1><br></h1>'
      ) {
        this.editor.setSelection(this._htmlContent.length, 0);
        return this.restoreTitle(this._htmlContent);
      } else {
        return '';
      }
    } else {
      return this._htmlContent;
    }
  }

  @Input()
  set htmlContent(val: string) {
    if (this.isTitle && this.headingSelect === undefined) {
      this._htmlContent = this.restoreTitle(val);
      this.textService.setText(this.restoreTitle(val));
    } else {
      this._htmlContent = val;
      this.textService.setText(val);
    }
  }

  restoreTitle(text: string): any {
    if ((text.startsWith('<p>') && text.endsWith('</p>')) || text.startsWith('<h1><h1>')) {
      if (this.textWithoutHtml(text).length > 0) {
        return '<h1>' + this.textWithoutHtml(text) + '</h1>';
      } else {
        return '';
      }
    } else if (text.startsWith('<h1>')) {
      if (this.textWithoutHtml(text).length > 0) {
        return text;
      } else {
        return '';
      }
    } else {
      return '<h1>' + text;
    }
  }

  textWithoutHtml(text: string): string {
    return text.replace(/<[^>]*>/g, '');
  }
}
