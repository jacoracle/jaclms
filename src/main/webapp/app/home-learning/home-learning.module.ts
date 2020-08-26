import { NgModule } from '@angular/core';

import { ConstructorSharedModule } from 'app/shared/shared.module';
import { HomeLearningComponent } from 'app/home-learning/home-learning.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RouterModule } from '@angular/router';
import { MatSelectModule } from '@angular/material/select';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

@NgModule({
  imports: [RouterModule, ConstructorSharedModule, MatFormFieldModule, MatAutocompleteModule, MatSelectModule, MatInputModule],
  declarations: [HomeLearningComponent]
})
export class HomeLearningModule {}
