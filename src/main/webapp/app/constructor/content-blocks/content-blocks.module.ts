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
// import { ContentBlock11Component } from './content-block11/content-block11.component';
import { ContentBlock12Component } from './content-block12/content-block12.component';
import { ContentBlock13Component } from './content-block13/content-block13.component';
import { ContentBlock14Component } from './content-block14/content-block14.component';
// import { ConstructorHeaderComponent } from '../components/constructor-header/constructor-header.component';
// import { ConstructorColapsableComponent } from '../components/constructor-colapsable/constructor-colapsable.component';
// import { ConstructorTipComponent } from '../components/constructor-tip/constructor-tip.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { ConstructorActivityComponent } from 'app/constructor/components/constructor-activity/constructor-activity.component';

@NgModule({
  imports: [CommonModule, SafeHtmlModule, MatExpansionModule],
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
    // ContentBlock11Component,
    ContentBlock12Component,
    ContentBlock13Component,
    ContentBlock14Component,
    ConstructorActivityComponent
  ],
  exports: [
    MatExpansionModule,
    ContentBlock3Component,
    VisorTextComponent,
    ContentBlock4Component,
    ConstructorVideoComponent,
    ContentBlock6Component,
    ContentBlock7Component,
    ConstructorImageComponent,
    ConstructorPdfComponent,
    ConstructorSoundComponent,
    // ContentBlock11Component,
    ContentBlock12Component,
    ContentBlock13Component,
    ContentBlock14Component,
    ConstructorActivityComponent
  ]
})
export class ContentBlocksModule {}
