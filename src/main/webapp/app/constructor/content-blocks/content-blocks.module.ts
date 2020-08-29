import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentBlock3Component } from './content-block3/content-block3.component';
import { ConstructorImageComponent } from '../components/constructor-image/constructor-image.component';

@NgModule({
  declarations: [ContentBlock3Component, ConstructorImageComponent],
  imports: [CommonModule],
  exports: [ContentBlock3Component, ConstructorImageComponent]
})
export class ContentBlocksModule {}
