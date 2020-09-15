import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentBlock3Component } from './content-block3/content-block3.component';
import { ConstructorImageComponent } from '../components/constructor-image/constructor-image.component';
import { VisorTextComponent } from 'app/visor/components/visor-text/visor-text.component';
import { ContentBlock4Component } from './content-block4/content-block4.component';
import { ConstructorVideoComponent } from '../components/constructor-video/constructor-video.component';
import { ContentBlock6Component } from './content-block6/content-block6.component';
import { ContentBlock7Component } from './content-block7/content-block7.component';
import { ConstructorPdfComponent } from '../components/constructor-pdf/constructor-pdf.component';
import { ConstructorSoundComponent } from '../components/constructor-sound/constructor-sound.component';
import { SafeHtmlModule } from 'app/shared/safe-html/safe-html.module';
import { ConstructorActivityComponent } from 'app/constructor/components/constructor-activity/constructor-activity.component';
@NgModule({
  imports: [CommonModule, SafeHtmlModule],
  declarations: [
    ContentBlock3Component,
    VisorTextComponent,
    ContentBlock4Component,
    ConstructorVideoComponent,
    ContentBlock6Component,
    ContentBlock7Component,
    ConstructorImageComponent,
    ConstructorPdfComponent,
    ConstructorSoundComponent,
    ConstructorActivityComponent
  ],
  exports: [
    ContentBlock3Component,
    VisorTextComponent,
    ContentBlock4Component,
    ConstructorVideoComponent,
    ContentBlock6Component,
    ContentBlock7Component,
    ConstructorImageComponent,
    ConstructorPdfComponent,
    ConstructorSoundComponent,
    ConstructorActivityComponent
  ]
})
export class ContentBlocksModule {}
