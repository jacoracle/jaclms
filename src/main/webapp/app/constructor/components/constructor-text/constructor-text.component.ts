import { ChangeDetectorRef, Component, Input, Renderer2, ViewChild, ViewEncapsulation, ViewRef } from '@angular/core';
import { TextService } from 'app/services/text.service';
import { ITipoBloqueComponentes } from 'app/shared/model/tipo-bloque-componentes.model';
import { ContentBlocksService } from 'app/services/content-blocks.service';
import Quill from 'quill';
import { QuillEditor } from 'ngx-quill';

@Component({
  selector: 'jhi-constructor-text',
  templateUrl: './constructor-text.component.html',
  styleUrls: ['./constructor-text.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ConstructorTextComponent {
  _htmlContent = '';
  editor: any;
  placeholder =
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.";
  isTitle = false;
  templates: ITipoBloqueComponentes[] = [];
  headingSelect: any;
  @Input() showTextEditor?: boolean;
  @ViewChild('quill_editor', { static: false }) quill_editor: any;

  isEventInEditor = false;
  @ViewChild('toggleButton', { static: false }) toggleButton: any;
  @ViewChild('menu', { static: false }) menu: any;
  lastInnerHtml = '';
  lastInnerText = '';

  tagsHtmlNoCerrar: any = ['P', 'H1', 'UL', 'OL', 'LI', 'SPAN', 'EM', 'U', 'STRONG', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6'];

  constructor(
    private textService: TextService,
    private contentBlocksService: ContentBlocksService,
    private renderer: Renderer2,
    private cdr: ChangeDetectorRef
  ) {
    this.lastInnerHtml = '';
    this.lastInnerText = '';
    this.listenerAllApp();
    const Font = Quill.import('attributors/class/font');
    Font.whitelist = ['arial', 'times-new-roman', 'calibri', 'comic-sans-ms'];
    Quill.register(Font, true);

    this.contentBlocksService.getTempaltes().subscribe(templates => {
      this.templates = templates;
    });
    this.textService.getText().subscribe(text => {
      if (this.lastInnerText !== '' && !this.showTextEditor) {
        const editableElements = document.querySelectorAll('[quill-editor-element]');
        if (editableElements[0]) {
          editableElements[0].innerHTML = this.lastInnerHtml;
        }
      } else {
        this._htmlContent = text;
        if (this.isTitle && this.headingSelect === undefined && this.textWithoutHtml(this._htmlContent).length === 1) {
          setTimeout(() => {
            if (this.cdr && !(this.cdr as ViewRef).destroyed) {
              this.cdr.detectChanges();
            }
          });
          setTimeout(() => {
            this.editor.setSelection(this.textWithoutHtml(this._htmlContent).length + 1, 0);
          }, 500);
        }
      }
    });

    this.textService.getTemplateType().subscribe(templateTypeId => {
      const componentVisor = templateTypeId.nombre;
      if (componentVisor === 'tip' || componentVisor === 'colapsable') {
        this.placeholder =
          "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s. This alarm has only been evacuated";
      } else {
        this.placeholder =
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.";
      }

      switch (componentVisor) {
        case 'titulo':
        case 'activity_question_text':
        case 'activity_question_media':
        case 'cabecera':
          this.isTitle = true;
          break;
        default:
          this.isTitle = false;
          break;
      }
    });
  }

  afterCreated(quill: QuillEditor): void {
    this.editor = quill;
  }

  /*  @Input()
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
  }*/

  listenerAllApp(): void {
    this.renderer.listen('window', 'click', (e: any) => {
      this.conditionListener(e);
    });
  }

  listenerNoWrite(e: any): void {
    this.conditionListener(e);
  }

  conditionListener(e: any): void {
    setTimeout(() => {
      if (this.cdr && !(this.cdr as ViewRef).destroyed) {
        this.cdr.detectChanges();
      }
    });
    if (
      this.tagsHtmlNoCerrar.includes(e.path[0].tagName) ||
      e.path[0].outerHTML.indexOf('<div quill-editor-toolbar="" class="ql-toolbar') !== -1 ||
      e.path[0].outerHTML.indexOf('<div class="ql-editor ql-blank" data-gramm="false" contenteditable="true"') !== -1 ||
      e.path[0].outerHTML.indexOf('<div quill-editor-element="" class="ql-container ql-snow"></div>') !== -1 ||
      e.path[0].outerHTML.indexOf('<div class="ql-editor" data-gramm="false" contenteditable="true"') !== -1 ||
      e.path[0].outerHTML.indexOf('<span class="ql-picker-label" tabindex="0" role="button" aria-expanded="true"') !== -1 ||
      e.path[0].outerHTML.indexOf('class="ql-stroke"') !== -1 ||
      e.path[0].outerHTML.indexOf('class="ql-picker-item') !== -1
    ) {
      this.isEventInEditor = true;
      this.focus(false);
    } else {
      this.isEventInEditor = false;
      this.focus(true);
    }
  }

  focus(suprim: boolean): void {
    const editableElements = document.querySelectorAll('[quill-editor-element]');
    if (editableElements[0]) {
      if (suprim && this.isEventInEditor) {
        const htmlElement = editableElements[0] as HTMLElement;
        this.lastInnerText = htmlElement.innerText;
        this.lastInnerHtml = htmlElement.innerHTML;
        if (this._htmlContent !== '') {
          this.textService.setText(this._htmlContent);
          editableElements[0].innerHTML = '';
        }
      }
    }
  }

  isEventInEditorText(): void {
    this.isEventInEditor = true;
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

  noWrite(event: Event): any {
    if (this.isTitle && this.headingSelect === undefined) {
      this.textService.setTextFinish(this.restoreTitle(this._htmlContent));
    } else {
      this.textService.setTextFinish(this._htmlContent);
    }
    this.listenerNoWrite(event);
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
