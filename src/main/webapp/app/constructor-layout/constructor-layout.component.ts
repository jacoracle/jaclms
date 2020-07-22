import { Component, OnInit, OnDestroy } from '@angular/core';
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
  colorMode = '';

  constructor(
    private textEditorBehaviosService: TextEditorBehaviorService,
    private route: ActivatedRoute,
    private cursoService: CursoService,
    private moduloService: ModuloService,
    private currentCourseService: CurrentCourseService,
    private currentModuleService: CurrentModuleService,
    private colorModeService: ColorModeService
  ) {
    const id = this.route.snapshot.paramMap.get('id') as any;
    const type = this.route.snapshot.paramMap.get('type') as string;

    if (id && type === 'course') {
      this.cursoService.find(id).subscribe(response => {
        this.curso = response.body;
        this.currentCourseService.setCurrentCourse(this.curso);
        this.currentCourseService.setType(type);
      });
    } else {
      this.moduloService.find(id).subscribe(response => {
        this.modulo = response.body;
        this.currentModuleService.setCurrentModule(this.modulo);
        this.currentModuleService.setType(type);
      });
    }
    this.subscription = this.textEditorBehaviosService.getShowTextEditor().subscribe(showTextEditor => {
      this.showTextEditor = showTextEditor;
    });
    this.colorModeService.getColorMode().subscribe(colorMode => {
      this.colorMode = colorMode;
    });
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
