import { NgModule } from '@angular/core';
import { ConstructorSharedLibsModule } from './shared-libs.module';
import { FindLanguageFromKeyPipe } from './language/find-language-from-key.pipe';
import { AlertComponent } from './alert/alert.component';
import { AlertErrorComponent } from './alert/alert-error.component';
import { LoginModalComponent } from './login/login.component';
import { HasAnyAuthorityDirective } from './auth/has-any-authority.directive';
import { PdfModalComponent } from 'app/shared/pdf-preview/pdf-modal.component';

@NgModule({
  imports: [ConstructorSharedLibsModule],
  declarations: [
    FindLanguageFromKeyPipe,
    AlertComponent,
    AlertErrorComponent,
    LoginModalComponent,
    PdfModalComponent,
    HasAnyAuthorityDirective
  ],
  entryComponents: [LoginModalComponent, PdfModalComponent],
  exports: [
    ConstructorSharedLibsModule,
    FindLanguageFromKeyPipe,
    AlertComponent,
    AlertErrorComponent,
    LoginModalComponent,
    PdfModalComponent,
    HasAnyAuthorityDirective
  ]
})
export class ConstructorSharedModule {}
