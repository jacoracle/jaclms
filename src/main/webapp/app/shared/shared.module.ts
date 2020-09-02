import { NgModule } from '@angular/core';
import { ConstructorSharedLibsModule } from './shared-libs.module';
import { FindLanguageFromKeyPipe } from './language/find-language-from-key.pipe';
import { AlertComponent } from './alert/alert.component';
import { AlertErrorComponent } from './alert/alert-error.component';
import { LoginModalComponent } from './login/login.component';
import { HasAnyAuthorityDirective } from './auth/has-any-authority.directive';
import { PdfModalComponent } from 'app/shared/pdf-preview/pdf-modal.component';
import { VideoModalComponent } from 'app/shared/video-preview/video-modal.component';
// import { SafeHtmlPipe } from 'app/shared/safe-html/safe-html.pipe';
// PONCHO
import { ActivityModalComponent } from 'app/shared/activity-preview/activity-modal.component';
import { MatRadioModule } from '@angular/material/radio';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDividerModule } from '@angular/material/divider';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { ActivityPreviewComponent } from 'app/shared/activity-preview/activity-preview.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { ActivityAnswersComponent } from 'app/shared/activity-preview/questions/answers/activity-answers.component';
import { ActivityQuestionsComponent } from 'app/shared/activity-preview/questions/activity-questions.component';
// import { UmaPreviewModalComponent } from './uma-preview/uma-preview.component';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { UmaPreviewModule } from './uma-preview/uma-preview.module';
import { SafeHtmlModule } from './safe-html/safe-html.module';

@NgModule({
  imports: [
    ConstructorSharedLibsModule,
    MatRadioModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatDividerModule,
    MatCardModule,
    MatDialogModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    SafeHtmlModule,
    UmaPreviewModule
  ],
  declarations: [
    FindLanguageFromKeyPipe,
    // SafeHtmlPipe,
    AlertComponent,
    AlertErrorComponent,
    LoginModalComponent,
    PdfModalComponent,
    VideoModalComponent,
    ActivityModalComponent,
    ActivityPreviewComponent,
    ActivityAnswersComponent,
    ActivityQuestionsComponent,
    // UmaPreviewModalComponent,
    HasAnyAuthorityDirective
  ],
  entryComponents: [LoginModalComponent, PdfModalComponent, VideoModalComponent, ActivityModalComponent, HasAnyAuthorityDirective],
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
    VideoModalComponent,
    ActivityModalComponent,
    // UmaPreviewModalComponent
    VideoModalComponent
    // UmaPreviewModalComponent
  ]
})
export class ConstructorSharedModule {}
