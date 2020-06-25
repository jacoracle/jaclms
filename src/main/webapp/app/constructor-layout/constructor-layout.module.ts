import { NgModule } from '@angular/core';

import { ConstructorSharedModule } from 'app/shared/shared.module';
import { ConstructorLayoutComponent } from './constructor-layout.component';
import { ConstructorFilmstripComponent } from './../constructor/constructor-filmstrip/constructor-filmstrip.component';
import { ConstructorVisorContainerComponent } from './../constructor/constructor-visor-container/constructor-visor-container.component';
import { ConstructorComponentContainerComponent } from './../constructor/constructor-component-container/constructor-component-container.component';
import { ConstructorTextComponent } from './../constructor/components/constructor-text/constructor-text.component';
import { ContentBlock1Component } from './../constructor/content-blocks/content-block1/content-block1.component';
import { ContentBlock2Component } from './../constructor/content-blocks/content-block2/content-block2.component';
import { ContentBlock3Component } from './../constructor/content-blocks/content-block3/content-block3.component';
import { ContentBlock4Component } from './../constructor/content-blocks/content-block4/content-block4.component';
import { ContentBlock5Component } from './../constructor/content-blocks/content-block5/content-block5.component';
import { ContentBlock6Component } from './../constructor/content-blocks/content-block6/content-block6.component';
import { ContentBlock7Component } from './../constructor/content-blocks/content-block7/content-block7.component';
import { VisorTextComponent } from './../visor/components/visor-text/visor-text.component';
import { ConstructorImageComponent } from './../constructor/components/constructor-image/constructor-image.component';
import { ConstructorVideoComponent } from './../constructor/components/constructor-video/constructor-video.component';
import { TopBarComponent } from './../layouts/top-bar/top-bar.component';
import { LeftSidebarComponent } from './../layouts/left-sidebar/left-sidebar.component';
import { RightSidebarComponent } from './../layouts/right-sidebar/right-sidebar.component';
import { TemplateGalleryComponent } from '../constructor/template-gallery/template-gallery.component';
import { ConstructorHierarchicalStructureComponent } from '../constructor/constructor-hierarchical-structure/constructor-hierarchical-structure.component';
import { ConstructorBookInformationComponent } from '../constructor/constructor-book-information/constructor-book-information.component';
import { ConstructorComponentPropertiesComponent } from '../constructor/constructor-component-properties/constructor-component-properties.component';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { ContentBlock8Component } from 'app/constructor/content-blocks/content-block8/content-block8.component';
import { ConstructorPdfComponent } from 'app/constructor/components/constructor-pdf/constructor-pdf.component';

@NgModule({
  imports: [ConstructorSharedModule, AngularEditorModule],
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
    ConstructorTextComponent,
    VisorTextComponent,
    ConstructorImageComponent,
    ConstructorVideoComponent,
    ConstructorPdfComponent,
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
