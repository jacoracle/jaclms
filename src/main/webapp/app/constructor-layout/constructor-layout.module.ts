import { NgModule } from '@angular/core';

import { ConstructorSharedModule } from 'app/shared/shared.module';
import { ConstructorLayoutComponent } from './constructor-layout.component';
import { ConstructorFilmstripComponent } from 'app/constructor/constructor-filmstrip/constructor-filmstrip.component';
import { ConstructorVisorContainerComponent } from 'app/constructor/constructor-visor-container/constructor-visor-container.component';
import { ConstructorComponentContainerComponent } from 'app/constructor/constructor-component-container/constructor-component-container.component';
import { ConstructorTextComponent } from 'app/constructor/components/constructor-text/constructor-text.component';
import { ContentBlock1Component } from 'app/constructor/content-blocks/content-block1/content-block1.component';
import { ContentBlock2Component } from 'app/constructor/content-blocks/content-block2/content-block2.component';
import { ContentBlock5Component } from 'app/constructor/content-blocks/content-block5/content-block5.component';
import { TopBarComponent } from 'app/layouts/top-bar/top-bar.component';
import { LeftSidebarComponent } from 'app/layouts/left-sidebar/left-sidebar.component';
import { RightSidebarComponent } from 'app/layouts/right-sidebar/right-sidebar.component';
import { TemplateGalleryComponent } from '../constructor/template-gallery/template-gallery.component';
import { ConstructorHierarchicalStructureComponent } from '../constructor/constructor-hierarchical-structure/constructor-hierarchical-structure.component';
import { ConstructorBookInformationComponent } from '../constructor/constructor-book-information/constructor-book-information.component';
import { ConstructorComponentPropertiesComponent } from '../constructor/constructor-component-properties/constructor-component-properties.component';
import { ContentBlock8Component } from 'app/constructor/content-blocks/content-block8/content-block8.component';
import { ContentBlock9Component } from 'app/constructor/content-blocks/content-block9/content-block9.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { QuillModule } from 'ngx-quill';
// import { DynamicModule } from 'ng-dynamic-component';
import { ContentBlocksModule } from 'app/constructor/content-blocks/content-blocks.module';
import { SafeHtmlModule } from 'app/shared/safe-html/safe-html.module';
import { ContentBlock10Component } from 'app/constructor/content-blocks/content-block10/content-block10.component';
import { DynamicModule } from 'ng-dynamic-component';
import { ContentBlock3Component } from 'app/constructor/content-blocks/content-block3/content-block3.component';
import { ContentBlock4Component } from 'app/constructor/content-blocks/content-block4/content-block4.component';
import { ContentBlock7Component } from 'app/constructor/content-blocks/content-block7/content-block7.component';
import { ContentBlock6Component } from 'app/constructor/content-blocks/content-block6/content-block6.component';
// import { ContentBlock11Component } from 'app/constructor/content-blocks/content-block11/content-block11.component';
import { ContentBlock12Component } from 'app/constructor/content-blocks/content-block12/content-block12.component';
import { ContentBlock13Component } from 'app/constructor/content-blocks/content-block13/content-block13.component';
import { ContentBlock14Component } from 'app/constructor/content-blocks/content-block14/content-block14.component';
import { ConstructorComponentPropertiesBlockComponent } from 'app/constructor/constructor-component-properties-block/constructor-component-properties-block.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { ContentBlock11Component } from 'app/constructor/content-blocks/content-block11/content-block11.component';
import { ContentBlock17Component } from 'app/constructor/content-blocks/content-block17/content-block17.component';
import { ContentBlock18Component } from 'app/constructor/content-blocks/content-block18/content-block18.component';
import { ContentBlock15Component } from 'app/constructor/content-blocks/content-block15/content-block15.component';
import { ContentBlock16Component } from 'app/constructor/content-blocks/content-block16/content-block16.component';
import { ContentBlock19Component } from 'app/constructor/content-blocks/content-block19/content-block19.component';
import { InteractiveActivitiesModule } from 'app/constructor/interactive-activities/interactive-activities.module';
import { ContentBlock20Component } from 'app/constructor/content-blocks/content-block20/content-block20.component';

@NgModule({
  imports: [
    QuillModule.forRoot(),
    ConstructorSharedModule,
    SafeHtmlModule,
    DragDropModule,
    MatSlideToggleModule,
    ContentBlocksModule,
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
      ContentBlock10Component,
      ContentBlock11Component,
      ContentBlock12Component,
      ContentBlock13Component,
      ContentBlock14Component,
      ContentBlock15Component,
      ContentBlock16Component,
      ContentBlock17Component,
      ContentBlock18Component,
      ContentBlock19Component,
      ContentBlock20Component
    ]),
    InteractiveActivitiesModule
  ],
  declarations: [
    ConstructorLayoutComponent,
    ConstructorFilmstripComponent,
    ConstructorVisorContainerComponent,
    ConstructorComponentContainerComponent,
    ContentBlock1Component,
    ContentBlock2Component,
    // ContentBlock3Component,
    // ContentBlock4Component,
    ContentBlock5Component,
    // ContentBlock6Component,
    // ContentBlock7Component,
    ContentBlock8Component,
    ContentBlock9Component,
    ContentBlock10Component,
    ContentBlock11Component,
    ContentBlock15Component,
    ContentBlock16Component,
    ConstructorTextComponent,
    ContentBlock19Component,
    ContentBlock20Component,
    // VisorTextComponent,
    // ConstructorImageComponent,
    // ConstructorVideoComponent,
    // ConstructorPdfComponent,
    // ConstructorSoundComponent,
    // VisorTextComponent,
    // ConstructorImageComponent,
    // ConstructorVideoComponent,
    // ConstructorPdfComponent,
    // ConstructorSoundComponent,
    TopBarComponent,
    LeftSidebarComponent,
    RightSidebarComponent,
    TemplateGalleryComponent,
    ConstructorHierarchicalStructureComponent,
    ConstructorBookInformationComponent,
    ConstructorComponentPropertiesComponent,
    ConstructorComponentPropertiesBlockComponent
  ],
  exports: [
    TopBarComponent,
    RightSidebarComponent,
    LeftSidebarComponent,
    ConstructorVisorContainerComponent,
    ConstructorComponentContainerComponent
  ]
})
export class ConstructorLayoutModule {}
