import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { TextEditorBehaviorService } from 'app/services/text-editor-behavior.service';
import { ActivatedRoute } from '@angular/router';
import { CursoService } from 'app/entities/curso/curso.service';
import { CurrentCourseService } from 'app/services/current-course.service';
import { ColorModeService } from 'app/services/color-mode.service';

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
  colorMode = '';

  constructor(
    private textEditorBehaviosService: TextEditorBehaviorService,
    private route: ActivatedRoute,
    private cursoService: CursoService,
    private currentCourseService: CurrentCourseService,
    private colorModeService: ColorModeService
  ) {
    const cursoId = this.route.snapshot.paramMap.get('cursoId') as any;
    this.cursoService.find(cursoId).subscribe(response => {
      this.curso = response.body;
      this.currentCourseService.setCurrentCourse(this.curso);
    });
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
