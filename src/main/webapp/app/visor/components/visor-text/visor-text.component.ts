import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { Subscription } from 'rxjs';
import { Componente } from 'app/shared/model/componente.model';
import { TextService } from 'app/services/text.service';
import { TextEditorBehaviorService } from 'app/services/text-editor-behavior.service';
import { NavigationControlsService } from 'app/services/navigation-controls.service';
import { Contenido, IContenido } from 'app/shared/model/contenido.model';
import { ContenidoService } from 'app/entities/contenido/contenido.service';
import { JhiEventManager, JhiEventWithContent } from 'ng-jhipster';

@Component({
  selector: 'jhi-visor-text',
  templateUrl: './visor-text.component.html',
  styleUrls: ['./visor-text.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class VisorTextComponent implements OnInit {
  htmlContent = '';
  exampleContent =
    "<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>";
  shortExampleContent =
    "<p> Lorem Ipsum has been the industry's standard dummy text ever since the 1500s. This alarm has only been evacuated.</p>";
  subscription: Subscription;
  imgSrc = './../../../../content/images/img3.png';
  editing = false;
  text = '';
  @Input() component?: Componente;
  @Input() templateType?: any;
  @Output() updateComponent = new EventEmitter();

  constructor(
    private textService: TextService,
    private textEditorBehaviosService: TextEditorBehaviorService,
    private navigationControlsService: NavigationControlsService,
    private contenidoService: ContenidoService,
    private eventManager: JhiEventManager
  ) {
    this.subscription = this.textService.getEditing().subscribe(editing => {
      this.editing = editing;
      this.textService.getTextFinish().subscribe(textFinish => {
        if (this.editing && this.component!.contenido!.id) {
          this.component!.contenido!.contenido = this.htmlContent;
          // Actualizar contenido de componente en base de datos
          if (textFinish === this.text && textFinish !== '') {
            const contenido = this.createUpdatedContent(this.component!.contenido!, this.htmlContent);
            if (contenido.contenido) {
              if (this.textWithoutHtml(contenido.contenido).length <= 2000) {
                this.subscription = this.contenidoService.update(contenido).subscribe(
                  data => {
                    this.component!.contenido = data.body!;
                  },
                  () => {
                    this.eventManager.broadcast(
                      new JhiEventWithContent('constructorApp.httpError', {
                        message: 'constructorApp.curso.blockUpdate.error',
                        type: 'danger'
                      })
                    );
                  }
                );
              } else {
                this.eventManager.broadcast(
                  new JhiEventWithContent('constructorApp.validationError', {
                    message: 'constructorApp.contenido.limit.error',
                    type: 'danger'
                  })
                );
              }
            }
          }
        }
      });
    });

    this.textService.getText().subscribe(text => {
      this.text = text;
      if (this.editing) {
        this.htmlContent = text ? text : '';
      }
    });
  }

  textWithoutHtml(text: string): string {
    return text.replace(/<[^>]*>/g, '');
  }

  createUpdatedContent(content: IContenido, newContent: string): IContenido {
    return {
      ...new Contenido(),
      id: content.id,
      contenido: newContent
    };
  }

  ngOnInit(): void {
    this.htmlContent = this.component!.contenido!.contenido!;
  }

  selectText(): void {
    this.textService.setSelectText(true);
  }

  editText(): void {
    this.textEditorBehaviosService.setShowTextEditor(true);
    this.textService.setEditing(false);
    this.editing = true;
    this.textService.setTemplateType(this.templateType);
    this.navigationControlsService.setOpenProperties(false);
    this.textService.setText(this.htmlContent);
    // this.navigationControlsService.setOpenTemplateGallery(true);
  }

  isShortExample(): boolean {
    return this.templateType.nombre === 'tip' || this.templateType.nombre === 'colapsable';
  }
}
