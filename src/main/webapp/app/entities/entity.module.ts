import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PhoneNumberComponent } from './phone-number/phone-number.component';
import { CountryComponent } from './country/country.component';

import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTabsModule } from '@angular/material/tabs';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { MatTreeModule } from '@angular/material/tree';
import { MatRadioModule } from '@angular/material/radio';
import { MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule, MatProgressBarModule, MatButtonModule } from '@angular/material';
import { LearningPathHierarchicalAddLevelComponent } from './nivel-jerarquico/dialog-add-level/learning-path-hierarchical-add-level.component';

@NgModule({
  imports: [
    CommonModule,
    MatChipsModule,
    MatSelectModule,
    MatTreeModule,
    MatDialogModule,
    MatIconModule,
    MatRadioModule,
    MatMenuModule,
    RouterModule.forChild([
      {
        path: 'asignatura',
        loadChildren: () => import('./asignatura/asignatura.module').then(m => m.ConstructorAsignaturaModule)
      },
      {
        path: 'numero-grado',
        loadChildren: () => import('./numero-grado/numero-grado.module').then(m => m.ConstructorNumeroGradoModule)
      },
      {
        path: 'grado-academico',
        loadChildren: () => import('./grado-academico/grado-academico.module').then(m => m.ConstructorGradoAcademicoModule)
      },
      {
        path: 'curso',
        loadChildren: () => import('./curso/curso.module').then(m => m.ConstructorCursoModule)
      },
      {
        path: 'ficha',
        loadChildren: () => import('./ficha/ficha.module').then(m => m.ConstructorFichaModule)
      },
      {
        path: 'colaborador',
        loadChildren: () => import('./colaborador/colaborador.module').then(m => m.ConstructorColaboradorModule)
      },
      {
        path: 'editorial',
        loadChildren: () => import('./editorial/editorial.module').then(m => m.ConstructorEditorialModule)
      },
      {
        path: 'rol-colaborador',
        loadChildren: () => import('./rol-colaborador/rol-colaborador.module').then(m => m.ConstructorRolColaboradorModule)
      },
      {
        path: 'categoria',
        loadChildren: () => import('./categoria/categoria.module').then(m => m.ConstructorCategoriaModule)
      },
      {
        path: 'modalidad',
        loadChildren: () => import('./modalidad/modalidad.module').then(m => m.ConstructorModalidadModule)
      },
      {
        path: 'version',
        loadChildren: () => import('./version/version.module').then(m => m.ConstructorVersionModule)
      }
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ])
  ],
  exports: [
    MatAutocompleteModule,
    MatChipsModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    MatExpansionModule,
    MatStepperModule,
    MatTabsModule,
    DragDropModule,
    MatTreeModule,
    MatDialogModule,
    MatRadioModule,
    MatMenuModule,
    MatProgressBarModule,
    MatButtonModule
  ],
  declarations: [PhoneNumberComponent, CountryComponent],
  entryComponents: [LearningPathHierarchicalAddLevelComponent]
})
export class ConstructorEntityModule {}
