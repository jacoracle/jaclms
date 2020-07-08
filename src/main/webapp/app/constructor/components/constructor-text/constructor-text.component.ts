import { Component, Input, AfterViewInit, OnInit } from '@angular/core';
import { TextService } from 'app/services/text.service';
import { ITipoBloqueComponentes } from 'app/shared/model/tipo-bloque-componentes.model';
import { ContentBlocksService } from 'app/services/content-blocks.service';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import * as QuillNamespace from 'quill';

@Component({
  selector: 'jhi-constructor-text',
  templateUrl: './constructor-text.component.html',
  styleUrls: ['./constructor-text.component.scss']
})
export class ConstructorTextComponent implements OnInit, AfterViewInit {
  modules = {};
  // htmlContent: any;
  placeholder =
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.";
  private _htmlContent = '';
  get htmlContent(): string {
    return this._htmlContent;
  }
  @Input()
  set htmlContent(val: string) {
    this._htmlContent = val;
    // eslint-disable-next-line no-console
    console.log(val);
    this.textService.setText(this.htmlContent);
  }
  title = false;
  templates: ITipoBloqueComponentes[] = [];

  editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: 'auto',
    minHeight: '0',
    maxHeight: 'auto',
    width: 'auto',
    minWidth: '0',
    translate: 'yes',
    enableToolbar: true,
    showToolbar: true,
    placeholder: 'Escribe aquí el texto',
    defaultParagraphSeparator: 'p',
    defaultFontName: '',
    defaultFontSize: '4',
    fonts: [
      { class: 'arial', name: 'Arial' },
      { class: 'times-new-roman', name: 'Times New Roman' },
      { class: 'calibri', name: 'Calibri' },
      { class: 'comic-sans-ms', name: 'Comic Sans MS' }
    ],
    customClasses: [
      {
        name: 'quote',
        class: 'quote'
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: 'titleText',
        class: 'titleText',
        tag: 'h1'
      }
    ],
    uploadUrl: 'v1/image',
    uploadWithCredentials: false,
    sanitize: true,
    toolbarPosition: 'top',
    toolbarHiddenButtons: [
      ['strikeThrough', 'subscript', 'superscript', 'indent', 'outdent'],
      [
        'backgroundColor',
        'customClasses',
        'link',
        'unlink',
        'insertImage',
        'insertVideo',
        'insertHorizontalRule',
        'removeFormat',
        'toggleEditorMode'
      ]
    ]
  };

  constructor(private textService: TextService, private contentBlocksService: ContentBlocksService) {
    const Quill: any = QuillNamespace;
    const Font = Quill.import('attributors/class/font');
    Font.whitelist = ['arial', 'times-new-roman', 'calibri', 'comic-sans-ms'];
    Quill.register(Font, true);

    this.contentBlocksService.getTempaltes().subscribe(templates => {
      this.templates = templates;
    });
    this.textService.getText().subscribe(text => {
      this._htmlContent = text;
    });
    this.textService.getTemplateTypeId().subscribe(templateTypeId => {
      this.title = this.getTemplateName(templateTypeId) === 'titulo';
    });
  }

  ngOnInit(): void {
    if (this.title) {
      /*  this.editorConfig.toolbarHiddenButtons![0].push('insertUnorderedList');
      this.editorConfig.toolbarHiddenButtons![0].push('insertOrderedList');
      this.editorConfig.toolbarHiddenButtons![0].push('heading');
      this.editorConfig.toolbarHiddenButtons![1].push('fontSize');*/
    }
  }

  ngAfterViewInit(): void {
    this.fixTitleOptions();
  }

  fixTitleOptions(): void {
    /*
    const options = document.getElementsByClassName("ae-picker-item");
    for(let i = 0; i < options.length; i++) {
      try {
        if(i < 6) {
          options[i].firstChild!.nodeValue = "Título " + (i + 1);
        }
      }
      catch(e) {
        console.error(e);
       }
    }
    */
    /*
    document.getElementsByClassName("ae-picker-item")[0].hidden = true
    document.getElementsByClassName("ae-picker-item")[0].firstChild.nodeValue = "Título 1"
    */
  }

  restoreTitle(text: string): string {
    if (!text.startsWith('<h1>')) {
      return '<h1>' + text + '</h1>';
    }
    return text;
  }

  getTemplateName(templateId: number): string {
    let name = '';
    for (let i = 0; i < this.templates.length; i++) {
      if (this.templates[i].id === templateId) {
        name = this.templates[i].nombre!;
        break;
      }
    }
    return name;
  }
}
