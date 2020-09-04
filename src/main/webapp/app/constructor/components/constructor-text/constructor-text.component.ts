import { Component, Input, Renderer2, ViewChild, ViewEncapsulation } from '@angular/core';
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
  htmlContent = '';
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

  constructor(private textService: TextService, private contentBlocksService: ContentBlocksService, private renderer: Renderer2) {
    this.lastInnerHtml = '';
    this.htmlContent = '';
    this.listenerApp();
    const Font = Quill.import('attributors/class/font');
    Font.whitelist = ['arial', 'times-new-roman', 'calibri', 'comic-sans-ms'];
    Quill.register(Font, true);

    this.contentBlocksService.getTempaltes().subscribe(templates => {
      this.templates = templates;
    });
    this.textService.getText().subscribe(text => {
      // eslint-disable-next-line no-debugger
      debugger;
      if (this.lastInnerHtml !== '' && !this.showTextEditor) {
        const editableElements = document.querySelectorAll('[quill-editor-element]');
        if (editableElements[0] && editableElements[0].parentNode) {
          editableElements[0].innerHTML = this.lastInnerHtml;
        }
      }
      if (this.htmlContent === '' && text !== '') {
        this.quill_editor.quillEditor.clipboard.dangerouslyPasteHTML(text);
      }
      if (text !== '') {
        this.htmlContent = text;
      }
    });
    this.textService.getTemplateType().subscribe(templateTypeId => {
      const componente = templateTypeId.nombre;
      if (componente === 'titulo' || componente === 'actividad') {
        this.isTitle = true;
      }
    });
  }

  listenerApp(): void {
    // eslint-disable-next-line no-debugger
    debugger;

    this.renderer.listen('window', 'click', (e: any) => {
      this.conditionListener(e);
    });
  }

  listenerNoWrite(e: any): void {
    // eslint-disable-next-line no-debugger
    debugger;
    this.conditionListener(e);
  }

  conditionListener(e: any): void {
    if (
      e.path[0].tagName === 'P' ||
      e.path[0].tagName === 'H1' ||
      e.path[0].outerHTML.indexOf('<div quill-editor-toolbar="" class="ql-toolbar') !== -1
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
      val = '<h1>' + event.path[0].innerText + event.key + '</h1>';
      this.htmlContent = this.restoreTitle(val);
      this.textService.setText(this.restoreTitle(val));
    } else {
      val = '<p>' + event.path[0].innerText + event.key + '</p>';
      this.htmlContent = val;
      this.textService.setText(val);
    }
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

  inactive(): void {
    const editorContainer = document.getElementById('gcc-collapse');
    if (editorContainer) {
      editorContainer.classList.add('inactive');
    }
    this.quill_editor.enable(false);
  }

  active(): void {
    const editorContainer = document.getElementById('gcc-collapse');
    if (editorContainer) {
      editorContainer.classList.remove('inactive');
    }
    this.quill_editor.enable(true);
  }

  focus(delet: boolean): void {
    const editableElements = document.querySelectorAll('[quill-editor-element]');
    if (editableElements[0] && editableElements[0].parentNode) {
      if (editableElements[0].innerHTML !== '') {
        this.lastInnerHtml = editableElements[0].innerHTML;
      }
      if (delet) {
        editableElements[0].innerHTML = '';
        this.textService.setText(this.htmlContent);
        this.htmlContent = '';
      }
    }
  }

  isEventInEditorText(): void {
    this.isEventInEditor = true;
  }
}
