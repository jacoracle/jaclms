import { NgModule } from '@angular/core';

import { QuestionComponent } from './question/question.component';
import { FormsModule } from '@angular/forms';

import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { ConstructorSharedModule } from 'app/shared/shared.module';
import { ResourceAudioComponent } from './resources/resource-audio/resource-audio.component';
import { ResourceVideoComponent } from './resources/resource-video/resource-video.component';
import { SpecialCharactersModule } from 'app/directives/special-characters/special-characters.module';
import { MatchingComponent } from './matching/matching.component';

@NgModule({
  imports: [
    FormsModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    MatProgressBarModule,
    ConstructorSharedModule,
    SpecialCharactersModule
  ],
  declarations: [QuestionComponent, ResourceAudioComponent, ResourceVideoComponent, MatchingComponent],
  entryComponents: [QuestionComponent, MatchingComponent],
  exports: [QuestionComponent, MatchingComponent]
})
export class InteractiveActivitiesModule {}
