import { Component, OnDestroy, Input, AfterViewInit, Output, EventEmitter, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Componente } from 'app/shared/model/componente.model';
import { TextService } from 'app/services/text.service';
import { TextEditorBehaviorService } from 'app/services/text-editor-behavior.service';

@Component({
  selector: 'jhi-visor-text',
  templateUrl: './visor-text.component.html',
  styleUrls: ['./visor-text.component.scss']
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

  constructor(private textService: TextService, private textEditorBehaviosService: TextEditorBehaviorService) {
    this.subscription = this.textService.getEditing().subscribe(editing => {
      this.editing = editing;
    });
    this.subscription = this.textService.getText().subscribe(text => {
      if (text && this.editing) {
        this.htmlContent = text;
        this.component!.contenido = this.htmlContent;
        this.updateComponent.emit({ newValue: text, type: 'text' });
      }
    });
    /*
    this.subscription = this.messageService.getMessage().subscribe(message => {
      if (message) {
        this.htmlContent = message.text;
      } else {
        this.htmlContent = '';
      }
    });
    */
  }

  ngOnInit(): void {
    this.htmlContent = this.component!.contenido!;
  }

  ngAfterViewInit(): void {}

  ngOnDestroy(): void {
    // this.subscription.unsubscribe();
  }

  editText(): void {
    this.textService.setEditing(false);
    this.editing = true;
    this.textService.setText(this.htmlContent);
    this.textService.setTemplateTypeId(this.templateType);
    this.textEditorBehaviosService.setShowTextEditor(true);
  }
}
