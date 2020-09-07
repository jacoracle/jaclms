import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  Renderer2,
  ViewChild,
  ViewEncapsulation,
  ViewRef
} from '@angular/core';
import { TextService } from 'app/services/text.service';
import { ITipoBloqueComponentes } from 'app/shared/model/tipo-bloque-componentes.model';
import { ContentBlocksService } from 'app/services/content-blocks.service';
import Quill from 'quill';
import { QuillEditor } from 'ngx-quill';

@Component({
  selector: 'jhi-constructor-text',
  templateUrl: './constructor-text.component.html',
  styleUrls: ['./constructor-text.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConstructorTextComponent {
  htmlContent = '';
  placeholder =
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.";
  isTitle = false;
  templates: ITipoBloqueComponentes[] = [];
  headingSelect: any;
  @Input() showTextEditor?: boolean;
  @ViewChild('quill_editor', { static: false }) quill_editor: any;
  editor: any;

  isEventInEditor = false;
  @ViewChild('toggleButton', { static: false }) toggleButton: any;
  @ViewChild('menu', { static: false }) menu: any;
  lastInnerHtml = '';
  lastInnerText = '';

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

    this.textService.getTemplateType().subscribe(templateTypeId => {
      const componentVisor = templateTypeId.nombre;
      if (componentVisor === 'titulo' || componentVisor === 'actividad') {
        this.isTitle = true;
      } else if (componentVisor === 'texto') {
        this.isTitle = false;
      }
    });

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
        this.cdr.detectChanges();
        this.htmlContent = text;
        this.cursorFinal(this.textWithoutHtml(text));
      }
    });
  }

  cursorFinal(text: string): void {
    this.editor.setSelection(text.length, 0);
  }

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
      e.path[0].tagName === 'P' ||
      e.path[0].tagName === 'H1' ||
      e.path[0].outerHTML.indexOf('class="ql-toolbar') !== -1 ||
      e.path[0].outerHTML.indexOf('class="ql-editor') !== -1 ||
      e.path[0].outerHTML.indexOf('class="ql-container') !== -1 ||
      e.path[0].outerHTML.indexOf('class="ql-editor') !== -1 ||
      e.path[0].outerHTML.indexOf('class="ql-picker-label') !== -1 ||
      e.path[0].outerHTML.indexOf('class="ql-stroke') !== -1 ||
      e.path[0].outerHTML.indexOf('class="ql-picker-item') !== -1
    ) {
      this.isEventInEditor = true;
      this.focus(false);
    } else {
      this.isEventInEditor = false;
      this.focus(true);
    }
  }

  setHtmlContent(event: any): void {
    let val;
    if (this.isTitle && this.headingSelect === undefined) {
      val = this.restoreTitle(this.setKey(event));
      this.htmlContent = this.restoreTitle(this.htmlContent);
      this.cursorFinal(this.textWithoutHtml(val));
      this.textService.setText(this.restoreTitle(val));
    } else {
      val = this.setKey(event);
      this.cursorFinal(this.textWithoutHtml(val));
      this.textService.setText(val);
    }
  }

  setKey(event: any): string {
    let val = this.htmlContent;
    if (this.htmlContent) {
      const splitHtml = this.htmlContent.split(/<[^>]*>/g);
      let indexReg = 0;
      for (let i = 0; i < splitHtml.length; i++) {
        if (splitHtml[i] !== '') {
          indexReg = i;
        }
      }
      val = val.replace(splitHtml[indexReg], splitHtml[indexReg] + event.key);
    } else {
      val = event.key;
    }
    return val;
  }

  noWrite(event: Event): void {
    if (this.isTitle && this.headingSelect === undefined) {
      this.textService.setTextFinish(this.restoreTitle(this.htmlContent));
    } else {
      this.textService.setTextFinish(this.htmlContent);
    }
    this.listenerNoWrite(event);
  }

  restoreTitle(text: string): any {
    if (text) {
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
    } else {
      return '<h1> </h1>';
    }
  }

  textWithoutHtml(text: string): string {
    return text.replace(/<[^>]*>/g, '');
  }

  focus(suprim: boolean): void {
    const editableElements = document.querySelectorAll('[quill-editor-element]');
    if (editableElements[0]) {
      if (suprim && this.isEventInEditor) {
        const htmlElement = editableElements[0] as HTMLElement;
        this.lastInnerText = htmlElement.innerText;
        this.lastInnerHtml = htmlElement.innerHTML;
        if (this.htmlContent !== '') {
          this.textService.setText(this.htmlContent);
          editableElements[0].innerHTML = '';
        }
      }
    }
  }

  isEventInEditorText(): void {
    this.isEventInEditor = true;
  }

  afterCreated(quill: QuillEditor): void {
    this.editor = quill;
  }
}
