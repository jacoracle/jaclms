import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { QuestionComponent } from './question/question.component';
import { FormsModule } from '@angular/forms';

import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  imports: [BrowserModule, FormsModule, MatIconModule, MatInputModule, MatSelectModule],
  declarations: [QuestionComponent],
  entryComponents: [QuestionComponent],
  exports: [QuestionComponent]
})
export class InteractiveActivitiesModule {}
