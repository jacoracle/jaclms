import { NgModule } from '@angular/core';

import { QuestionComponent } from './question/question.component';
import { FormsModule } from '@angular/forms';

import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ConstructorSharedLibsModule } from 'app/shared/shared-libs.module';

@NgModule({
  imports: [FormsModule, MatIconModule, MatInputModule, MatSelectModule, MatCheckboxModule, ConstructorSharedLibsModule],
  declarations: [QuestionComponent],
  entryComponents: [QuestionComponent],
  exports: [QuestionComponent]
})
export class InteractiveActivitiesModule {}
