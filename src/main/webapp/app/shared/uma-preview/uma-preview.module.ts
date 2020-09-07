import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UmaPreviewModalComponent } from './uma-preview.component';
import { ContentBlocksModule } from 'app/constructor/content-blocks/content-blocks.module';

@NgModule({
  declarations: [UmaPreviewModalComponent],
  imports: [CommonModule, ContentBlocksModule],
  entryComponents: [UmaPreviewModalComponent],
  exports: [UmaPreviewModalComponent]
})
export class UmaPreviewModule {}
