import { Component, OnInit, OnDestroy, Renderer2 } from '@angular/core';
import { Subscription } from 'rxjs';
import { TextEditorBehaviorService } from 'app/services/text-editor-behavior.service';
import { ActivatedRoute } from '@angular/router';
import { CursoService } from 'app/entities/curso/curso.service';
import { CurrentCourseService } from 'app/services/current-course.service';
import { ColorModeService } from 'app/services/color-mode.service';
import { ModuloService } from 'app/entities/modulo/modulo.service';
import { CurrentModuleService } from 'app/services/current-module.service';

@Component({
  selector: 'jhi-constructor-layout',
  templateUrl: './constructor-layout.component.html',
  styleUrls: ['./constructor-layout.component.scss']
})
export class ConstructorLayoutComponent implements OnInit, OnDestroy {
  rightIsContracted = false;
  leftIsContracted = false;
  showTextEditor = false;
  subscription: Subscription;
  curso: any;
  modulo: any;
  type: string;
  colorMode = '';

  constructor(
    private textEditorBehaviosService: TextEditorBehaviorService,
    private route: ActivatedRoute,
    private cursoService: CursoService,
    private moduloService: ModuloService,
    private currentCourseService: CurrentCourseService,
    private currentModuleService: CurrentModuleService,
    private colorModeService: ColorModeService,
    private renderer: Renderer2
  ) {
    this.renderer.listen('window', 'click', (e: any) => {
      if (
        !(
          e.path[0].tagName === 'P' ||
          e.path[0].tagName === 'H1' ||
          e.path[0].tagName === 'span' ||
          e.path[0].tagName === 'UL' ||
          e.path[0].tagName === 'OL' ||
          e.path[0].tagName === 'LI' ||
          e.path[0].outerHTML.indexOf('<div class="ql-editor ql-blank" data-gramm="false" contenteditable="true"') !== -1 ||
          e.path[0].outerHTML.indexOf('<div quill-editor-toolbar="" class="ql-toolbar') !== -1 ||
          e.path[0].outerHTML.indexOf('<div quill-editor-element="" class="ql-container ql-snow"></div>') !== -1 ||
          e.path[0].outerHTML.indexOf('<div class="ql-editor" data-gramm="false" contenteditable="true"') !== -1 ||
          e.path[0].outerHTML.indexOf('<span class="ql-picker-label" tabindex="0" role="button" aria-expanded="true"') !== -1 ||
          e.path[0].outerHTML.indexOf('class="ql-stroke"') !== -1 ||
          e.path[0].outerHTML.indexOf('class="ql-picker-item') !== -1
        )
      ) {
        this.showTextEditor = false;
      }
    });

    const id = this.route.snapshot.paramMap.get('id') as any;
    this.type = this.route.snapshot.paramMap.get('type') as string;

    if (id && this.type === 'course') {
      this.cursoService.find(id).subscribe(response => {
        this.curso = response.body;
        this.currentCourseService.setCurrentCourse(this.curso);
      });
      this.currentCourseService.setType(this.type);
    }
    if (id && this.type === 'module') {
      this.moduloService.find(id).subscribe(response => {
        this.modulo = response.body;
        this.currentModuleService.setCurrentModule(this.modulo);
      });
      this.currentModuleService.setType(this.type);
    }
    this.subscription = this.textEditorBehaviosService.getShowTextEditor().subscribe(showTextEditor => {
      this.showTextEditor = showTextEditor;
    });
    this.colorModeService.getColorMode().subscribe(colorMode => {
      this.colorMode = colorMode;
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {}
}
