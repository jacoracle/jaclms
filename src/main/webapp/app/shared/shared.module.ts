import { NgModule } from '@angular/core';
import { ConstructorSharedLibsModule } from './shared-libs.module';
import { FindLanguageFromKeyPipe } from './language/find-language-from-key.pipe';
import { AlertComponent } from './alert/alert.component';
import { AlertErrorComponent } from './alert/alert-error.component';
import { LoginModalComponent } from './login/login.component';
import { HasAnyAuthorityDirective } from './auth/has-any-authority.directive';
import { PdfModalComponent } from 'app/shared/pdf-preview/pdf-modal.component';
import { VideoModalComponent } from 'app/shared/video-preview/video-modal.component';
import { SafeHtmlPipe } from 'app/shared/safe-html/safe-html.pipe';
import { ActivityModalComponent } from 'app/shared/activity-preview/activity-modal.component';

@NgModule({
  imports: [ConstructorSharedLibsModule],
  declarations: [
    FindLanguageFromKeyPipe,
    SafeHtmlPipe,
    AlertComponent,
    AlertErrorComponent,
    LoginModalComponent,
    PdfModalComponent,
    VideoModalComponent,
    ActivityModalComponent,
    HasAnyAuthorityDirective
  ],
  entryComponents: [LoginModalComponent, PdfModalComponent, VideoModalComponent, ActivityModalComponent],
  exports: [
    ConstructorSharedLibsModule,
    FindLanguageFromKeyPipe,
    SafeHtmlPipe,
    AlertComponent,
    AlertErrorComponent,
    LoginModalComponent,
    PdfModalComponent,
    HasAnyAuthorityDirective,
    VideoModalComponent,
    ActivityModalComponent
  ]
})
export class ConstructorSharedModule {}
