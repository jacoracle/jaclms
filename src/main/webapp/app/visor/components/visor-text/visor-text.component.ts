import { AfterViewInit, Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewEncapsulation } from '@angular/core';
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
export class VisorTextComponent implements OnDestroy, AfterViewInit, OnInit {
  htmlContent = '';
  exampleContent =
    "<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>";
  subscription: Subscription;
  imgSrc = './../../../../content/images/img3.png';
  editing = false;
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
    });
    this.subscription = this.textService.getText().subscribe(text => {
      if (this.editing) {
        this.htmlContent = text ? text : '';
        this.component!.contenido!.contenido = this.htmlContent;
        // Actualizar contenido de componente en base de datos
        const contenido = this.createUpdatedContent(this.component!.contenido!, this.htmlContent);
        this.subscription = this.contenidoService.update(contenido).subscribe(
          data => {
            this.component!.contenido = data.body!;
          },
          () => {
            this.eventManager.broadcast(
              new JhiEventWithContent('constructorApp.blockUpdateError', {
                message: 'constructorApp.curso.blockUpdate.error',
                type: 'danger'
              })
            );
          }
        );
      }
    });
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

  ngAfterViewInit(): void {}

  ngOnDestroy(): void {
    // this.subscription.unsubscribe();
  }

  editText(): void {
    this.textService.setEditing(false);
    this.editing = true;
    this.textService.setText(this.htmlContent);
    this.textService.setTemplateType(this.templateType);
    this.textEditorBehaviosService.setShowTextEditor(true);
    this.navigationControlsService.setOpenProperties(false);
    // this.navigationControlsService.setOpenTemplateGallery(true);
  }
}
