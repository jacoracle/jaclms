import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ConstructorSharedModule } from 'app/shared/shared.module';
import { ModalidadComponent } from './modalidad.component';
import { ModalidadDetailComponent } from './modalidad-detail.component';
import { ModalidadUpdateComponent } from './modalidad-update.component';
import { ModalidadDeleteDialogComponent } from './modalidad-delete-dialog.component';
import { modalidadRoute } from './modalidad.route';

@NgModule({
  imports: [ConstructorSharedModule, RouterModule.forChild(modalidadRoute)],
  declarations: [ModalidadComponent, ModalidadDetailComponent, ModalidadUpdateComponent, ModalidadDeleteDialogComponent],
  entryComponents: [ModalidadDeleteDialogComponent]
})
export class ConstructorModalidadModule {}
