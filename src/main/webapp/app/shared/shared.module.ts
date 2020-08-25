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
import { MatRadioModule } from '@angular/material/radio';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDividerModule } from '@angular/material/divider';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { MatButtonModule } from '@angular/material/button';
import { ActivityPreviewComponent } from 'app/shared/activity-preview/activity-preview.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { ActivityAnswersComponent } from 'app/shared/activity-preview/questions/answers/activity-answers.component';
import { ActivityQuestionsComponent } from 'app/shared/activity-preview/questions/activity-questions.component';

@NgModule({
  imports: [
    ConstructorSharedLibsModule,
    MatRadioModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatDividerModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatDialogModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule
  ],
  declarations: [
    FindLanguageFromKeyPipe,
    SafeHtmlPipe,
    AlertComponent,
    AlertErrorComponent,
    LoginModalComponent,
    PdfModalComponent,
    VideoModalComponent,
    ActivityModalComponent,
    ActivityPreviewComponent,
    ActivityAnswersComponent,
    ActivityQuestionsComponent,
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
