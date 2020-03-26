import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { ConstructorTestModule } from '../../../test.module';
import { CursoDetailComponent } from 'app/entities/curso/curso-detail.component';
import { Curso } from 'app/shared/model/curso.model';

describe('Component Tests', () => {
  describe('Curso Management Detail Component', () => {
    let comp: CursoDetailComponent;
    let fixture: ComponentFixture<CursoDetailComponent>;
    const route = ({ data: of({ curso: new Curso(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ConstructorTestModule],
        declarations: [CursoDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(CursoDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(CursoDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load curso on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.curso).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
