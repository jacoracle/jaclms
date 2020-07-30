import { NgModule } from '@angular/core';

import { ConstructorSharedModule } from 'app/shared/shared.module';
import { HomeLearningComponent } from 'app/home-learning/home-learning.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [RouterModule, ConstructorSharedModule, MatFormFieldModule, MatInputModule],
  declarations: [HomeLearningComponent]
})
export class HomeLearningModule {}
