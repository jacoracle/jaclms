import { NgModule } from '@angular/core';
import { ConstructorSharedLibsModule } from './shared-libs.module';
import { FindLanguageFromKeyPipe } from './language/find-language-from-key.pipe';
import { AlertComponent } from './alert/alert.component';
import { AlertErrorComponent } from './alert/alert-error.component';
import { LoginModalComponent } from './login/login.component';
import { HasAnyAuthorityDirective } from './auth/has-any-authority.directive';
import { PdfModalComponent } from 'app/shared/pdf-preview/pdf-modal.component';
import { VideoModalComponent } from 'app/shared/video-preview/video-modal.component';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { UmaPreviewModule } from './uma-preview/uma-preview.module';
import { SafeHtmlModule } from './safe-html/safe-html.module';

@NgModule({
  imports: [ConstructorSharedLibsModule, SafeHtmlModule, UmaPreviewModule],
  declarations: [
    FindLanguageFromKeyPipe,
    // SafeHtmlPipe,
    AlertComponent,
    AlertErrorComponent,
    LoginModalComponent,
    PdfModalComponent,
    VideoModalComponent,
    // UmaPreviewModalComponent,
    HasAnyAuthorityDirective
  ],
  entryComponents: [LoginModalComponent, PdfModalComponent, VideoModalComponent],
  exports: [
    MatInputModule,
    MatAutocompleteModule,
    UmaPreviewModule,
    ConstructorSharedLibsModule,
    FindLanguageFromKeyPipe,
    // SafeHtmlPipe,
    AlertComponent,
    AlertErrorComponent,
    LoginModalComponent,
    PdfModalComponent,
    HasAnyAuthorityDirective,
    VideoModalComponent
    // UmaPreviewModalComponent
  ]
})
export class ConstructorSharedModule {}
