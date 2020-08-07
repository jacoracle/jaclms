import { NgModule } from '@angular/core';

import { ConstructorSharedModule } from 'app/shared/shared.module';
import { ConstructorLayoutComponent } from './constructor-layout.component';
import { ConstructorFilmstripComponent } from 'app/constructor/constructor-filmstrip/constructor-filmstrip.component';
import { ConstructorVisorContainerComponent } from 'app/constructor/constructor-visor-container/constructor-visor-container.component';
import { ConstructorComponentContainerComponent } from 'app/constructor/constructor-component-container/constructor-component-container.component';
import { ConstructorTextComponent } from 'app/constructor/components/constructor-text/constructor-text.component';
import { ContentBlock1Component } from 'app/constructor/content-blocks/content-block1/content-block1.component';
import { ContentBlock2Component } from 'app/constructor/content-blocks/content-block2/content-block2.component';
import { ContentBlock3Component } from 'app/constructor/content-blocks/content-block3/content-block3.component';
import { ContentBlock4Component } from 'app/constructor/content-blocks/content-block4/content-block4.component';
import { ContentBlock5Component } from 'app/constructor/content-blocks/content-block5/content-block5.component';
import { ContentBlock6Component } from 'app/constructor/content-blocks/content-block6/content-block6.component';
import { ContentBlock7Component } from 'app/constructor/content-blocks/content-block7/content-block7.component';
import { VisorTextComponent } from 'app/visor/components/visor-text/visor-text.component';
import { ConstructorImageComponent } from 'app/constructor/components/constructor-image/constructor-image.component';
import { ConstructorVideoComponent } from 'app/constructor/components/constructor-video/constructor-video.component';
import { TopBarComponent } from 'app/layouts/top-bar/top-bar.component';
import { LeftSidebarComponent } from 'app/layouts/left-sidebar/left-sidebar.component';
import { RightSidebarComponent } from 'app/layouts/right-sidebar/right-sidebar.component';
import { TemplateGalleryComponent } from '../constructor/template-gallery/template-gallery.component';
import { ConstructorHierarchicalStructureComponent } from '../constructor/constructor-hierarchical-structure/constructor-hierarchical-structure.component';
import { ConstructorBookInformationComponent } from '../constructor/constructor-book-information/constructor-book-information.component';
import { ConstructorComponentPropertiesComponent } from '../constructor/constructor-component-properties/constructor-component-properties.component';
import { ConstructorPdfComponent } from 'app/constructor/components/constructor-pdf/constructor-pdf.component';
import { ConstructorSoundComponent } from 'app/constructor/components/constructor-sound/constructor-sound.component';
import { ContentBlock8Component } from 'app/constructor/content-blocks/content-block8/content-block8.component';
import { ContentBlock9Component } from 'app/constructor/content-blocks/content-block9/content-block9.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { QuillModule } from 'ngx-quill';
import { DynamicModule } from 'ng-dynamic-component';
import { ContentBlock10Component } from 'app/constructor/content-blocks/content-block10/content-block10.component';
import { ConstructorActivityComponent } from 'app/constructor/components/constructor-activity/constructor-activity.component';

@NgModule({
  imports: [
    QuillModule.forRoot(),
    ConstructorSharedModule,
    DragDropModule,
    DynamicModule.withComponents([
      ContentBlock1Component,
      ContentBlock2Component,
      ContentBlock3Component,
      ContentBlock4Component,
      ContentBlock5Component,
      ContentBlock6Component,
      ContentBlock7Component,
      ContentBlock8Component,
      ContentBlock9Component,
      ContentBlock10Component
    ])
  ],
  declarations: [
    ConstructorLayoutComponent,
    ConstructorFilmstripComponent,
    ConstructorVisorContainerComponent,
    ConstructorComponentContainerComponent,
    ContentBlock1Component,
    ContentBlock2Component,
    ContentBlock3Component,
    ContentBlock4Component,
    ContentBlock5Component,
    ContentBlock6Component,
    ContentBlock7Component,
    ContentBlock8Component,
    ContentBlock9Component,
    ContentBlock10Component,
    ConstructorTextComponent,
    VisorTextComponent,
    ConstructorImageComponent,
    ConstructorVideoComponent,
    ConstructorPdfComponent,
    ConstructorSoundComponent,
    ConstructorActivityComponent,
    TopBarComponent,
    LeftSidebarComponent,
    RightSidebarComponent,
    TemplateGalleryComponent,
    ConstructorHierarchicalStructureComponent,
    ConstructorBookInformationComponent,
    ConstructorComponentPropertiesComponent
  ]
})
export class ConstructorLayoutModule {}
